'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';
import PageLayout from '@/components/PageLayout';

export default function Login() {
  const locale = useLocale();
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) setError(undefined);

    const formData = new FormData(event.currentTarget);
    signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false
    }).then((result) => {
      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/' + locale);
      }
    });
  }

  return (
    <PageLayout title={t('title')}>
      <form
        action="/api/auth/callback/credentials"
        method="post"
        onSubmit={onSubmit}
        className="flex flex-col gap-4 w-80 mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <label className="flex flex-col">
          <span className="mb-2 text-gray-700">{t('username')}</span>
          <input
            name="username"
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-2 text-gray-700">{t('password')}</span>
          <input
            name="password"
            type="password"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {error && <p className="text-red-500">{t('error', { error })}</p>}
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t('submit')}
        </button>
      </form>
    </PageLayout>
  );
}