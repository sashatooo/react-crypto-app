
import { CryptoContextProvider } from "./context/crypto-context";
import AppLayout from "./componets/layouts/AppLayout";

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}

export default App;
