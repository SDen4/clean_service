import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MailCheck, Send, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

import {
  Input,
  PolicyCheckbox,
  ResetFormBtn,
  Textarea,
} from '@/features/contact-us';

import type { TErrors } from '@/entities/contact-us';
import {
  defaultErrors,
  defaultValues,
  emptyLocalstorageData,
  PreventSendBtn,
  storageKey,
} from '@/entities/contact-us';

import { useLocalStorage } from '@/shared/lib';
import { Button, FieldGroup, FieldSet, Spinner } from '@/shared/ui';

import { createEmailError } from '../model/helpers/create-email-error';
import { createMessageText } from '../model/helpers/create-message-text';

import { inputsList } from '../model/constants';

const ContactUsPage = () => {
  const product = useLocation().state?.product;
  const href = useLocation().state?.href;

  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (product?.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((prev) => ({ ...prev, message: createMessageText(product) }));
    }
  }, [href, product]);

  const time = useLocalStorage(storageKey, emptyLocalstorageData);

  const sendMessage = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem(storageKey, emptyLocalstorageData);

    const newErrors: TErrors = {
      name: !values.name ? 'ФИО обязательно' : '',
      email: createEmailError(values.email),
      phone: !values.phone ? 'Телефон обязателен' : '',
      message: !values.message ? 'Сообщение обязательно' : '',
      checkbox: !values.checkbox ? 'Обязательное поле' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((el) => !!el)) return;

    setIsPending(true);

    try {
      const response = await fetch('https://bep-remont.duckdns.org/bot/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, href }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();

      if (result) {
        setValues(defaultValues);
        toast('Ваше сообщение успешно доставлено', { icon: <MailCheck /> });
      }
    } catch (error) {
      localStorage.setItem(storageKey, String(new Date().getTime()));
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      toast(`Ошибка отправки сообщения: ${errorMessage}`, {
        icon: <TriangleAlert />,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <h2>Обратная связь</h2>

      <div className="flex flex-col gap-10 justify-center sm:justify-start w-full">
        <form
          noValidate
          onSubmit={sendMessage}
          className="flex flex-col w-full gap-5"
        >
          <div className="flex flex-col w-full gap-y-5 md:gap-0">
            <FieldGroup className="flex-col md:flex-row w-full">
              <FieldSet className="flex-1">
                {inputsList.map((item) => (
                  <Input
                    key={item.id}
                    item={item}
                    values={values}
                    errors={errors}
                    setValues={setValues}
                    setErrors={setErrors}
                    isDisabled={isPending}
                  />
                ))}
              </FieldSet>

              <FieldSet className="flex-1">
                <Textarea
                  values={values}
                  errors={errors}
                  setValues={setValues}
                  setErrors={setErrors}
                  isDisabled={isPending}
                />
              </FieldSet>
            </FieldGroup>

            <FieldSet>
              <PolicyCheckbox
                values={values}
                errors={errors}
                setValues={setValues}
                setErrors={setErrors}
                isDisabled={isPending}
              />
            </FieldSet>
          </div>

          <div className="flex gap-5 justify-between items-end w-full">
            <span>
              <i>* обязательное поле</i>
            </span>

            <div className="flex gap-5">
              <ResetFormBtn setValues={setValues} setErrors={setErrors} />

              {time === emptyLocalstorageData ? (
                <Button variant="outline" type="submit" disabled={isPending}>
                  {isPending ? <Spinner /> : <Send />}
                  Отправить
                </Button>
              ) : (
                <PreventSendBtn />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUsPage;
