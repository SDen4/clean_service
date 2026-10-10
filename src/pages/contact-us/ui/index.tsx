import { useActionState } from 'react';
import { MailCheck, Send, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

import type { TFormState, TInputErrors } from '@/features/contact-us';
import {
  Input,
  PolicyCheckbox,
  ResetFormBtn,
  Textarea,
} from '@/features/contact-us';

import { Button, FieldGroup, FieldSet, Spinner } from '@/shared/ui';

import { inputsList } from '../constants';

const ContactUsPage = () => {
  async function sendMessage(
    _previousState: TFormState | undefined | null,
    formData: { get: (arg0: string) => unknown },
  ) {
    // параметры запроса
    const values = {
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      checkbox: String(formData.get('checkbox') ?? ''),
    };

    const errors: TInputErrors = {
      name: !values.name ? 'ФИО обязательно' : '',
      email: !values.email ? 'Email обязателен' : '',
      phone: !values.phone ? 'Телефон обязателен' : '',
      message: !values.message ? 'Сообщение обязательно' : '',
      checkbox: !values.checkbox ? 'Обязательное поле' : '',
    };

    if (Object.values(errors).some((el) => !!el)) {
      return { errors, values };
    }

    try {
      fetch('https://bep-remont.duckdns.org/bot/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((res) => {
          if (res) {
            toast('Ваше сообщение успешно доставлено', { icon: <MailCheck /> });
          }
        })
        .catch((err) => {
          toast(`Ошибка отправки сообщения: ${err}`, {
            icon: <TriangleAlert />,
          });
        });
    } catch (error) {
      toast(`Ошибка отправки сообщения: ${error}`, { icon: <TriangleAlert /> });
    }

    return { success: true };
  }

  const [state, formAction, isPending] = useActionState(sendMessage, null);

  return (
    <>
      <h2>Обратная связь</h2>

      <div className="flex flex-col gap-10 justify-center sm:justify-start w-full">
        <form action={formAction} className="flex flex-col w-full gap-5">
          <div className="flex flex-col w-full gap-y-5 md:gap-0">
            <FieldGroup className="flex-col md:flex-row w-full">
              <FieldSet className="flex-1">
                {inputsList.map((item) => (
                  <Input key={item.id} item={item} state={state} />
                ))}
              </FieldSet>

              <FieldSet className="flex-1">
                <Textarea state={state} />
              </FieldSet>
            </FieldGroup>

            <FieldSet>
              <PolicyCheckbox state={state} />
            </FieldSet>
          </div>

          <div className="flex gap-5 justify-between items-end w-full">
            <span>
              <i>* обязательное поле</i>
            </span>

            <div className="flex gap-5">
              <ResetFormBtn />
              <Button variant="outline" type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : <Send />}
                Отправить
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUsPage;
