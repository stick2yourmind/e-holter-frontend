'use client';

import { SIGN_OUT_MUTATION } from '@/graphql/mutation/signOutMutation';
import { ApolloError, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { IconContext } from 'react-icons';
import { HiUser, HiClipboardList, HiLogout } from 'react-icons/hi';
import { toast } from 'sonner';

export default function Navbar() {
  const { push } = useRouter();
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: () => push('/signin'),
  });

  const onSignOut = async () => {
    try {
      await signOut();
      toast.success('Sign out succesfully');
    } catch (error) {
      console.log('🚀 ~ file: Navbar.tsx:22 ~ onSignOut ~ error:', error);

      if (error instanceof ApolloError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          return toast.error('The server is not reachable');
        }
      }

      return toast.error('An error has ocurred');
    }
  };

  const onGoToRecords = () => {
    push('/record');
  };
  return (
    <IconContext.Provider value={{ color: 'aliceblue', size: '1.5rem' }}>
      <nav className="mb-2 flex justify-end">
        <ul className="flex gap-2 rounded border-2 border-white p-2">
          <li
            className="flex cursor-pointer flex-col items-center justify-center p-1"
            onClick={onGoToRecords}
          >
            <HiClipboardList />
            <p>Records</p>
          </li>

          <li className="flex flex-col items-center justify-center p-1">
            <HiUser />
            <p>Profile</p>
          </li>

          <li className="flex cursor-pointer flex-col items-center justify-center p-1" onClick={onSignOut}>
            <HiLogout />
            <p>Sign out</p>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
