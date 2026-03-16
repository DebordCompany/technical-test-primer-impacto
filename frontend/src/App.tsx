import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DashboardContext } from "./modules/balance/infrastructure/components/DashboardContent"
import { DashboardProvider } from "./modules/balance/infrastructure/contexts/DashboardContext"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>
        <DashboardContext />
      </DashboardProvider>
    </QueryClientProvider>
  )
}

export default App
