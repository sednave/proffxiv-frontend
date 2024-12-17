import MostProfitableCraftsPage from "./pages/MostProfitableCraftsPage"
import ProfitCalculatorPage from "./pages/ProfitCalculatorPage"
import {
    Route,
    Routes
} from "react-router-dom";

const Hero = () => {
    return <div className="flex flex-col py-16">
            <Routes>
                <Route
                    path="/"
                    element={<ProfitCalculatorPage />}
                />
                <Route
                    path="/ProfitLookup"
                    element={<ProfitCalculatorPage />}
                />
                <Route
                    path="/MostProfitableCrafts"
                    element={<MostProfitableCraftsPage />}
                />
            </Routes>
    </div>
}
export default Hero