import { ReactNode } from 'react';
// import LocaleSwitcher from './LocaleSwitcher';

type Props = {
  children?: ReactNode;
  title?: string;
};

// export default function PageLayout({ children, title }: Props) {
//   return (
//     <div className="p-6 font-sans leading-relaxed box-border">
//       <div className="max-w-xl mx-auto">
//         {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
//         {children}
//         <div className="mt-6">
//           <LocaleSwitcher />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PageLayout({ children, title }: Props) {
  return (
    <div>
        {children}
    </div>
  );
}