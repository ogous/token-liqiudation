import React from 'react';
import Home from '../components/layout/Home'; 
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';

function App() {
    return (
        <SafeProvider>
            <Home />
        </SafeProvider>
    );
}

export default App;
