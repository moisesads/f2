const expect = require('chai').expect;
const { Canvas } = require('../../../src/graphic/index');
const Coord = require('../../../src/coord/index');
const { Region } = require('../../../src/component/guide/index');
const Scale = require('../../../src/scale/index');

describe('Guide.Region', function() {
  const coord = new Coord.Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 }
  });

  const canvas = new Canvas({
    el: 'guide',
    width: 500,
    height: 500,
    pixelRatio: 2
  });

  const group = canvas.addGroup();

  const xScale = Scale.cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ]
  });

  const yScale = Scale.linear({
    min: 0,
    max: 1200
  });

  it('guide region', function() {
    const region = new Region({
      xScale,
      yScale,
      start: [ 0, 200 ],
      end: [ 4, 800 ],
      style: {
        lineWidth: 1,
        fill: '#CCD7EB',
        fillOpacity: 0.4,
        stroke: 'blue'
      }
    });
    region.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].get('className')).to.equal('guide-region');
    expect(children[0].attr('width')).to.equal(400);
    expect(children[0].attr('height')).to.equal(200);
  });
});
