import 'leaflet/dist/leaflet.css';
import 'babel-polyfill';
import L from 'leaflet';
import { validateIp, addTileLayer, getAddress, addOffset } from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});
const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});
addTileLayer(map);
btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    //проверка на валидность
    if (validateIp(ipInput.value)) {
        //проверка данных
        getAddress(ipInput.value).then(setInfo);
    }
}
function handleKey(event) {
    if (event.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const { lat, lng, country, region, timezone } = mapData.location;
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: myIcon }).addTo(map);
    if (matchMedia('(max-width: 1023px)').matches) {
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAddress('102.122.22.1').then(setInfo);
});
