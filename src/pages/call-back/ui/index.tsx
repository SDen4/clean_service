import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { MailCheck, MailWarning, Send, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

import {
  CallBackAgreementCheckbox,
  Input,
  PolicyCheckbox,
  ResetFormBtn,
} from '@/features/call-back';

import type { TErrors } from '@/entities/call-back';
import {
  defaultErrors,
  defaultValues,
  emptyLocalstorageData,
  inputsList,
  PreventSendBtn,
  storageKey,
} from '@/entities/call-back';

import { useLocalStorage } from '@/shared/lib';
import { Button, FieldGroup, FieldSet, Spinner } from '@/shared/ui';

import { createPhoneError } from '../model/helpers/create-phone-error';

const CallBackPage = () => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const [isPending, setIsPending] = useState(false);

  const time = useLocalStorage(storageKey, emptyLocalstorageData);

  const sendMessage = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem(storageKey, emptyLocalstorageData);

    const newErrors: TErrors = {
      name: !values.name ? 'ФИО обязательно' : '',
      phone: createPhoneError(values.phone),
      checkbox: !values.checkbox ? 'Обязательное поле' : '',
      checkboxAgreement: !values.checkboxAgreement ? 'Обязательное поле' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((el) => !!el)) {
      toast('Заполните все обязательные поля', {
        icon: <MailWarning className="stroke-red-500" />,
      });
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch(
        'https://bep-remont.duckdns.org/bot/call-back',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        },
      );

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
      <h2>Перезвонить мне</h2>

      <div className="flex flex-col gap-10 justify-center sm:justify-start w-full">
        <form
          noValidate
          onSubmit={sendMessage}
          className="flex flex-col w-full gap-5"
        >
          <div className="flex flex-col w-full gap-y-5 md:gap-0">
            <FieldGroup className="w-full">
              <FieldSet className="flex flex-row flex-wrap !gap-5">
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
            </FieldGroup>

            <FieldSet>
              <CallBackAgreementCheckbox
                values={values}
                errors={errors}
                setValues={setValues}
                setErrors={setErrors}
                isDisabled={isPending}
              />
              <PolicyCheckbox
                values={values}
                errors={errors}
                setValues={setValues}
                setErrors={setErrors}
                isDisabled={isPending}
              />
            </FieldSet>
          </div>

          <div className="flex flex-wrap justify-between items-end w-full gap-5">
            <span>
              <i>* обязательное поле</i>
            </span>

            <div className="flex gap-5 ml-auto">
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

export default CallBackPage;
