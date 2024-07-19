import './AboutUs.css'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import foton from '../../assets/img/imhHeroe.jpg'
import { useNavigate } from 'react-router-dom';


export const AboutUs = () => {
    const navigate = useNavigate();

    const handleGoToVolunterings = () => {
        navigate('/VoluntersView')
    }
    return (
        <div className='aboutBody'>
            <NavBar />
            <div class="responsive-container-block bigContainer">
                <div class="responsive-container-block Container bottomContainer">
                    <div class="ultimateImg">
                        <img class="mainImg" src={foton} />
                        <div class="purpleBox">
                            <p class="purpleText">
                                Encuentra tu causa, dona tu tiempo:
                            </p>
                            <p class="purpleText">HeartReach.</p>
                            <img class="stars" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg" />
                        </div>
                    </div>
                    <div class="allText bottomText">
                        <p class="text-blk headingText">
                            Quienes somos?
                        </p>
                        <p class="text-blk subHeadingText">
                            Una gran misión.
                        </p>
                        <p class="text-blk description">
                            Este proyecto comenzó ante la pregunta: ¿por qué la gente no hace voluntariados? Intentando responder a la pregunta,
                            Llegamos a varias respuestas, como falta de tiempo, falta de interés en los temas de los voluntariados o cosas como el no puedo ir muy lejos. <br />
                            Con estas respuestas, nos dimos la tarea de crear una aplicación que pueda ayudar a encontrar tu voluntariado al que estés dispuesto, gracias a sus facilidades como:<br />
                            un mapa que te muestra que voluntariados te quedan mas cerca, voluntariados con una duracion de un dia, varios tipos de voluntariados para que puedas saber mas facil de
                            que va a tratar y un medio de comunicación directo en forma de chat con los organizadores del voluntariado para poder preguntarles cosas que puedan parecer confusas sobre
                            el voluntariado.
                        </p>
                        <a class="btn" onClick={handleGoToVolunterings}>
                            Mira nuestros voluntarios
                        </a>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

