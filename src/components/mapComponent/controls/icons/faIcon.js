const L =require ('leaflet');
// fa icon
export var faIcon =(url,size,className)=> L.divIcon({
    html: url,
    iconSize: size,
    className: className
});