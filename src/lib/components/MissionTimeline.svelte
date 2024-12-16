<script lang="ts">
    import { onMount } from 'svelte';
    import { missionTimelineData as data } from '../content/missionTimelineData';
    import * as d3 from 'd3';

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
    });
</script>

<div id="timeline-container">
    <svg id="timeline" viewBox="0 0 1100 700" preserveAspectRatio="slice"></svg>
</div>

<style>
    svg {
        background: none;
    }

    #timeline {
        position: relative;
        height: 100%;
        width: 100%;
    }

    #timeline-container {
        position: relative;
    }
</style>
