'use client';

import Error from 'next/error';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-500">Page Not Found</h1>
          <p className="text-lg mb-4">Sorry, we couldn't find the page you're looking for.</p>
          <Error statusCode={404} />
        </div>
      </body>
    </html>
  );
}