import HotTubSharpIcon from '@mui/icons-material/HotTubSharp';
import KitchenSharpIcon from '@mui/icons-material/KitchenSharp';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import MicrowaveSharpIcon from '@mui/icons-material/MicrowaveSharp';
import TsunamiSharpIcon from '@mui/icons-material/TsunamiSharp';
import PoolSharpIcon from '@mui/icons-material/PoolSharp';
import HeatPumpSharpIcon from '@mui/icons-material/HeatPumpSharp';
import KingBedSharpIcon from '@mui/icons-material/KingBedSharp';
import BalconySharpIcon from '@mui/icons-material/BalconySharp';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import TvSharpIcon from '@mui/icons-material/TvSharp';
import CountertopsSharpIcon from '@mui/icons-material/CountertopsSharp';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import CoffeeMakerOutlinedIcon from '@mui/icons-material/CoffeeMakerOutlined';
import LiquorSharpIcon from '@mui/icons-material/LiquorSharp';
import AirSharpIcon from '@mui/icons-material/AirSharp';

// aqui relacionamos un icono con cada registro de la tabla features de la base de datos.
export const featureIcons: Record<string, JSX.Element> = {
    Lavadora: <LocalLaundryServiceOutlinedIcon />,
    Nevera: <KitchenSharpIcon />, 
    Jacuzzi: <HotTubSharpIcon />,
    "Vista al mar": <TsunamiSharpIcon />,
    "Vista a la piscina": <PoolSharpIcon />,
    "Cama doble": <KingBedSharpIcon />,
    "Cama King Size": <KingBedSharpIcon />,
    "Aire acondicionado": <HeatPumpSharpIcon />,
    "Secadora de pelo": <AirSharpIcon />,
    Balcon: <BalconySharpIcon  />,
    Ducha: <ShowerOutlinedIcon />,
    Televisión: <TvSharpIcon />,
    Cocina: <CountertopsSharpIcon />,
    "Caja fuerte": <HttpsOutlinedIcon />,
    Cafetera: <CoffeeMakerOutlinedIcon />,
    Microondas: <MicrowaveSharpIcon />,
    Minibar: <LiquorSharpIcon />,
  };