import React, { ReactElement, Suspense } from 'react'
import CroctProvider from './croctContext'
import UserCard from './UserCard'
import Button from './Button';

function App(): ReactElement {
  return (
    <CroctProvider appId="00000000-0000-0000-0000-000000000000" debug>
      <Button />

      <Suspense fallback={<h1>Identifing user...</h1>}>
        <UserCard />
      </Suspense>
    </CroctProvider>
  );
}

export default App;
