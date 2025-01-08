"use client"

import Error from "next/error"

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-blue-100">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-red-500">
            Page Not Found
          </h1>
          <p className="mb-4 text-lg">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Error statusCode={404} />
        </div>
      </body>
    </html>
  )
}
