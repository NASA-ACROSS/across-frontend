<script lang="ts">
    import { onMount } from 'svelte';
    import { missionTimelineData as data } from '../content/missionTimelineData';
    import * as d3 from 'd3';

    export let document: Document;

    // Plot size and margins
    const margin = { top: 20, right: 20, bottom: 30, left: 100 },
        width = 1100 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    onMount(() => {
        const svg = d3
            .select('#timeline')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        console.log('svg element', svg);
        // Add background rectangle
        svg.append('rect')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('fill', 'none')
            .attr('transform', `translate(${-margin.left},${-margin.top})`);

        const types = [
            'Gamma-ray',
            'X-ray',
            'Optical & UV',
            'Infrared',
            'GW & nu',
        ];

        const y = d3.scaleBand().domain(types).range([0, height]).padding(0.15);

        const x = d3.scaleLinear().domain([2010, 2034]).range([0, width]);

        const ySubgroup = d3
            .scaleBand()
            .domain(d3.range(1, 6).map((el) => el.toString()))
            .range([0, y.bandwidth()])
            .padding(0.15);

        svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks((2034 - 2010) / 3)
                    .tickFormat(d3.format('d'))
            );

        svg.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y));

        // Define a color map
        const colorMap = {
            'Gamma-ray': '#984ea3',
            'X-ray': '#004D7F',
            'Optical & UV': '#FF9300',
            Infrared: '#B51700',
            'GW & nu': '#778899',
        };

        // Define gradient
        const defs = svg.append('defs');

        data.forEach((d, i) => {
            let gradientId = `gradient${i}`;
            let rectHeight = ySubgroup.bandwidth();

            if (d.type === 'GW & nu') {
                rectHeight = ySubgroup.bandwidth();
            }

            // Get color from the color map
            let color = colorMap[d.type];

            // Create a gradient for each bar using its color from the color map
            defs.append('linearGradient')
                .attr('id', gradientId)
                .attr('x1', '0%')
                .attr('x2', '100%')
                .attr('y1', '0%')
                .attr('y2', '0%')
                .selectAll('stop')
                .data([
                    { offset: '0%', color: color },
                    {
                        offset:
                            ((d.fade - d.start) / (d.end - d.start)) * 100 +
                            '%',
                        color: color,
                    },
                    { offset: '100%', color: `${color}00` }, // Modify color to have 0 opacity
                ])
                .enter()
                .append('stop')
                .attr('offset', (d) => d.offset)
                .attr('stop-color', (d) => d.color);

            const type = d.type;

            const yComputed =
                Number(y(type)) + Number(ySubgroup(d.index.toString()));

            svg.append('rect')
                .attr(
                    'class',
                    `bar ${d.type.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`
                )
                .attr('x', x(d.start))
                .attr('y', yComputed)
                .attr('width', x(d.end) - x(d.start))
                .attr('height', rectHeight)
                .style('fill', `url(#${gradientId})`)
                // .on("mouseover", function(event, d) {
                //     d3.select(this)
                //       .attr("height", rectHeight * 1.2)
                //       .attr("y", y(d.type) + ySubgroup(d.index) - rectHeight * 0.1);
                // })
                // .on("mouseout", function(event, d) {
                //     d3.select(this)
                //       .attr("height", rectHeight)
                //       .attr("y", y(d.type) + ySubgroup(d.index));
                // })
                .append('title')
                .text(`${d.name}: ${d.start} - ${d.end}`);
        });

        svg.selectAll('.text-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'text-label')
            .attr('x', (d) => x(d.start) + 5)
            .attr(
                'y',
                (d) =>
                    Number(y(d.type)) +
                    Number(ySubgroup(d.index.toString())) +
                    ySubgroup.bandwidth() / 2
            )
            .attr('dy', '.35em')
            .text((d) => d.name);

        // Add download icon to SVG
        svg.append('path')
            .attr('d', 'M3.25 13.25h9m-8.5-6.5 4 3.5 4-3.5m-4-5v8.5')
            .attr('class', 'download-icon')
            .attr(
                'transform',
                'translate(' + (width - 20) + ',' + -10 + ') scale(1.75)'
            ) // Adjust the position and scale as needed
            .on('click', function () {
                downloadPNG();
            });

        // Function to embed CSS into SVG
        function embedCSS(svg: Node, css) {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            svg.insertBefore(style, svg.firstChild);
        }

        // if (browser) {
        //     document
        //         .getElementById('download-button')
        //         .addEventListener('click', downloadPNG);
        // }
        // Download button functionality

        function downloadPNG() {
            const svgElement = document.getElementById('timeline')!;
            const serializer = new XMLSerializer();
            const svgData = serializer.serializeToString(svgElement);

            // Embed CSS into SVG
            const css = `
            @import url('https://fonts.googleapis.com/css2?family=Arial:wght@400&display=swap');
            .axis line, .axis path { stroke: #fff; }
            .axis text { font-size: 16px; fill: #fff; }
            .bar { fill-opacity: 1; }
            .gamma-ray { fill: #984ea3; }
            .x-ray { fill: #004D7F; }
            .optical-uv { fill: #FF9300; }
            .infrared { fill: #B51700; }
            .gw-nu { fill: LightSlateGray; }
            .text-label { fill: #fff; font-size: 14px; text-anchor: start; font-family: 'Arial', sans-serif; }
            svg { background: none; }
        `;
            const svgWithCSS = svgElement.cloneNode(true);
            embedCSS(svgWithCSS, css);
            const svgBlob = new Blob(
                [serializer.serializeToString(svgWithCSS)],
                {
                    type: 'image/svg+xml;charset=utf-8',
                }
            );

            // PNG size
            const pngWidth = 1666; // New width
            const pngHeight = 1000; // New height

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            canvas.width = pngWidth;
            canvas.height = pngHeight;

            const image = new Image();
            image.onload = function () {
                context.drawImage(image, 0, 0, pngWidth, pngHeight); // Scale SVG to canvas size
                const png = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'timeline.png';
                link.href = png;
                link.click();
            };

            const url = URL.createObjectURL(svgBlob);
            image.src = url;
        }
    });
</script>

<svg id="timeline" width="1100" height="700"></svg>
<br />
<button id="download-button">Download as PNG</button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Arial:wght@400&display=swap');

    body {
        font-family: 'Arial', sans-serif;
    }
    .axis line,
    .axis path {
        stroke: #fff; /* Change axis line and path color here */
    }
    .axis text {
        font-size: 16px; /* Adjust the font size as needed */
        fill: #fff; /* Change axis text color here */
    }
    .bar {
        fill-opacity: 1;
        transition:
            transform 0.3s ease,
            height 0.3s ease;
    }
    .gamma-ray {
        fill: #984ea3;
    }
    .x-ray {
        fill: #004d7f;
    }
    .optical-uv {
        fill: #ff9300;
    }
    .infrared {
        fill: #b51700;
    }
    .gw-nu {
        fill: LightSlateGray;
    }
    .text-label {
        fill: #fff;
        font-size: 14px;
        text-anchor: start;
    }

    .download-icon {
        cursor: pointer;
        fill: none; /* Use the fill specified in the SVG */
        stroke: gray; /* Default color */
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.5;
        transition: stroke 0.3s ease; /* Smooth transition */
    }

    .download-icon:hover {
        stroke: white; /* Color when hovered */
    }

    svg {
        background: none;
    }

    #download-button {
        margin: 10px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
