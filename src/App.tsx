import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import ReactGA from 'react-ga';

const TRACKING_ID = "G-MVF11SQ7Z0"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
export default function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}
