import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion"
import './forecast.css'

const Weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {

    const dayOfTheWeek = new Date().getDay();

    const forecastDays = Weekdays.slice(dayOfTheWeek, Weekdays.length).concat(Weekdays.slice(0, dayOfTheWeek));

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather-string" className="icon-small" src={`images/${item.weather[0].icon}.png`} />
                                    <label className="day">{forecastDays[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="temp-min-max">{Math.round(item.main.temp_min)}°F / {Math.round(item.main.temp_max)}°F</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind Speed</label>
                                    <label>{item.wind.speed}m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea Level</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like</label>
                                    <label>{item.main.feels_like}°F</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>

                ))}
                <AccordionItem>

                </AccordionItem>
            </Accordion>
        </>
    )
}

export default Forecast