import ymaps from 'ymaps';
import { el, setChildren } from 'redom';
import './map.css';

export function createMapPage(arr) {
    const section = el('section'),
        container = el('div.container'),
        title = el('h1.title.title_main.map-title', 'Карта банкоматов'),
        mapConatiner = el('div#map-container');

    setChildren(section, container);
    setChildren(container, [title, mapConatiner]);

    ymaps
        .load(
            'https://api-maps.yandex.ru/2.1/?apikey=3c5f819b-c1aa-4fd5-b3db-1c6e738e8daa&lang=ru_RU'
        )
        .then((maps) => {
            const map = new maps.Map(
                mapConatiner,
                {
                    center: [55.75846806898367, 37.60108849999989],
                    zoom: 11,
                    controls: ['geolocationControl', 'zoomControl'],
                },
                {
                    suppressMapOpenBlock: true,
                    geolocationControlSize: 'large',
                    geolocationControlPosition: {
                        top: '200px',
                        right: '20px',
                    },
                    geolocationControlFloat: 'none',
                    zoomControlSize: 'small',
                    zoomControlFloat: 'none',
                    zoomControlPosition: { top: '120px', right: '20px' },
                }
            );
            arr.forEach((element) => {
                const myPlacemark = new maps.Placemark(
                    [element.lat, element.lon],
                    {},
                    {
                        preset: 'islands#blueIcon',
                    }
                );

                map.geoObjects.add(myPlacemark);
            });
        });

    return section;
}
