'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';
import PageLayout from '@/components/page-layout';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">{t('username')}</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="m@example.com"
                  required
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('password')}</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t('forgot_password')}
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <span className="text-red-500">{t('error', { error })}</span>}
              <Button type="submit" className="w-full">
                {t('submit')}
              </Button>
              <Button variant="outline" className="w-full">
                {t('login_with_google')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {t('no_account')}{" "}
              <a href="#" className="underline underline-offset-4">
                {t('sign_up')}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
    </PageLayout>
  );
}