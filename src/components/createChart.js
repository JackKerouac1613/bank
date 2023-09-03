export function createChart(data) {
    function chartDate() {
        const from = new Date().setMonth(new Date().getMonth() - 6),
            arrayTrnasactions = [],
            columns = [[], [], [], [], [], []];

        data.transactions.map((item) => {
            if (new Date(item.date).getTime() >= from) {
                arrayTrnasactions.push(item);
            } else return;
        });

        const result = arrayTrnasactions.reduce((acc, val) => {
            const target = new Date(val.date).getMonth(),
                fist = new Date(arrayTrnasactions[0].date).getMonth();

            acc[target - fist].push(val);

            return acc;
        }, columns);

        function renderArray(array) {
            const handlerArray = [],
                monts = [
                    'янв',
                    'фев',
                    'март',
                    'апр',
                    'май',
                    'июнь',
                    'июль',
                    'авг',
                    'сен',
                    'окт',
                    'ноя',
                    'дек',
                ],
                arrMounts = [];

            array.forEach((arr) => {
                if (arr.length === 0) return;

                arrMounts.push(monts[new Date(arr[0].date).getMonth()]);
                let sum = null;
                arr.map((item) => {
                    sum += item.amount;
                });

                handlerArray.push(Math.round(sum));
            });

            return { handlerArray, arrMounts };
        }

        return renderArray(result);
    }

    const chartAreaBorder = {
        id: 'chartAreaBorder',
        beforeDraw(chart, options) {
            const {
                ctx,
                chartArea: { left, top, width, height },
            } = chart;
            ctx.save();
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.setLineDash(options.borderDash || []);
            ctx.lineDashOffset = options.borderDashOffset;
            ctx.strokeRect(left, top, width, height);
            ctx.restore();
        },
    };

    const arrDate = chartDate();

    const option = {
        type: 'bar',
        data: {
            labels: arrDate.arrMounts,
            datasets: [
                {
                    data: arrDate.handlerArray,
                    backgroundColor: '#116ACC',
                },
            ],
        },
        options: {
            categoryPercentage: 0.7,
            animation: true,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                chartAreaBorder: {
                    borderColor: '#000',
                    borderWidth: 1,
                },
            },
            layout: {
                padding: {
                    left: 1,
                    right: -24,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { display: false },
                    position: 'right',
                    ticks: {
                        padding: 24,
                        autoSkip: false,
                        maxTicksLimit: 2,
                        color: '#000',
                        backdropPadding: 0,
                        font: { weight: 500, family: 'Work Sans', size: 20 },
                    },
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#000',
                        font: { weight: 700, size: 20 },
                    },
                },
            },
        },
        plugins: [chartAreaBorder],
    };

    return option;
}
