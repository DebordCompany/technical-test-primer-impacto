import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DashboardContext } from "./modules/balance/infrastructure/components/DashboardContent"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContext />
    </QueryClientProvider>
  )
}

export default App
