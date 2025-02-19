
export default function Footer() {
  return (
    <>
    <footer className="bg-dark text-white py-4">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h5 className="text-xl font-semibold">Sobre Nosotros</h5>
                <p className="mt-2 text-gray-300">Explora nuestros destinos, hoteles y actividades para disfrutar de unas vacaciones inolvidables.</p>
            </div>

            
            <div>
                <h5 className="text-xl font-semibold">Enlaces Rápidos</h5>
                <ul className="mt-2 space-y-2">
                    <li><a href="#" className="text-white hover:underline">Nosotros</a></li>
                    <li><a href="#" className="text-white hover:underline">Nuestros Hoteles</a></li>
                    <li><a href="#" className="text-white hover:underline">Destinos y Actividades</a></li>
                </ul>
            </div>

            
            <div className="text-right">
                <h5 className="text-xl font-semibold">Desarrollado por</h5>
                <p className="mt-2 text-gray-300">Félix, Ryan, Pasadas, Ellison</p>
                <div className="mt-4 flex justify-end space-x-4">
                    
                    <a href="https://www.facebook.com" className="text-white hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M8.176 9.654h1.52V16h2.78V9.654h1.867s.175-1.053.263-2.623H12.475V5.649c0-.59.158-.991.976-.991h1.154V1.41S13.35 1 12.134 1C9.897 1 8.176 2.658 8.176 5.275V7.03H6.84V9.654h1.337z"/>
                        </svg>
                    </a>
                    <a href="https://www.twitter.com" className="text-white hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5 9.341-9.334 0-.14 0-.282-.006-.422A6.68 6.68 0 0 0 16 3.542a6.557 6.557 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.816 6.533 6.533 0 0 1-2.084.794A3.286 3.286 0 0 0 7.88 6.03a9.325 9.325 0 0 1-6.767-3.431 3.289 3.289 0 0 0 1.016 4.381A3.323 3.323 0 0 1 .64 6.575v.034a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.615-.058 3.287 3.287 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .781 13.58a9.286 9.286 0 0 0 5.034 1.474"/>
                        </svg>
                    </a>
                    <a href="https://www.instagram.com" className="text-white hover:text-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                            <path d="M8 3c-1.632 0-1.86.006-2.512.035a3.48 3.48 0 0 0-1.243.24c-.376.156-.635.34-.91.616-.275.275-.46.534-.616.91a3.48 3.48 0 0 0-.24 1.243c-.03.652-.035.88-.035 2.512s.006 1.86.035 2.512a3.48 3.48 0 0 0 .24 1.243c.156.376.34.635.616.91.275.275.534.46.91.616.376.156.635.34 1.243.24.652.03.88.035 2.512.035s1.86-.006 2.512-.035a3.48 3.48 0 0 0 1.243-.24c.376-.156.635-.34.91-.616.275-.275.46-.534.616-.91a3.48 3.48 0 0 0 .24-1.243c.03-.652.035-.88.035-2.512s-.006-1.86-.035-2.512a3.48 3.48 0 0 0-.24-1.243c-.156-.376-.34-.635-.616-.91-.275-.275-.534-.46-.91-.616a3.48 3.48 0 0 0-1.243-.24C9.86 3.006 9.632 3 8 3Zm0 1c1.582 0 1.775.006 2.388.033a2.48 2.48 0 0 1 .825.14c.194.08.336.174.504.342.168.168.262.31.342.504a2.48 2.48 0 0 1 .14.825c.027.613.033.806.033 2.388s-.006 1.775-.033 2.388a2.48 2.48 0 0 1-.14.825c-.08.194-.174.336-.342.504-.168.168-.31.262-.504.342a2.48 2.48 0 0 1-.825.14c-.613.027-.806.033-2.388.033s-1.775-.006-2.388-.033a2.48 2.48 0 0 1-.825-.14c-.194-.08-.336-.174-.504-.342-.168-.168-.262-.31-.342-.504a2.48 2.48 0 0 1-.14-.825c-.027-.613-.033-.806-.033-2.388s.006-1.775.033-2.388a2.48 2.48 0 0 1 .14-.825c.08-.194.174-.336.342-.504.168-.168.31-.262.504-.342a2.48 2.48 0 0 1 .825-.14c.613-.027.806-.033 2.388-.033Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM8 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm5.5-.4a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>

</>

  )
}
