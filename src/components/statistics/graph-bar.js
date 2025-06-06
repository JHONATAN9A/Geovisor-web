import Chart from 'chart.js/auto';

export function createGraphBar(layer){
    let grupos = {
        "0 - 0.9 ha": [],
        "1 - 4.9 ha": [],
        "5 - 9.9 ha": [],
        "10+ ha": []
    };

    layer.eachLayer((l) => {
        const area_metros = parseFloat(l.feature.properties.area_terreno || 0);
        const are_hectareas = area_metros/10000

        if (are_hectareas < 1) grupos["0 - 0.9 ha"].push(l);
        else if (are_hectareas < 5) grupos["1 - 4.9 ha"].push(l);
        else if (are_hectareas < 10) grupos["5 - 9.9 ha"].push(l);
        else grupos["10+ ha"].push(l);
    });

    const labels = Object.keys(grupos);
    const data = labels.map(label => grupos[label].length);

    const ctx = document.getElementById("myChart")

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels,
        datasets: [{
            label: "Cantidad de predios",
            data,
            backgroundColor: '#fb6300',
            borderColor: '#ffc961',
            borderWidth: 1
        }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onHover: (event, chartElement) => {
                if (chartElement.length > 0) {
                    const index = chartElement[0].index;
                    const label = labels[index];

                    // Reset
                    layer.eachLayer(l => l.setStyle({ color: 'ornage', weight: 1, fillOpacity: 0.2 }));

                    // Highlight
                    grupos[label].forEach(l => l.setStyle({ color: '#fb6300', weight: 2, fillOpacity: 0.6 }));
                } else {
                    layer.eachLayer(l => l.setStyle({ color: 'orange', weight: 1, fillOpacity: 0.2 }));
                }
            }
        }
    });
    
}