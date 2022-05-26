import Accessibility from './Accessibility';

const typeChart = [
  {
    type: 'accessibility',
  },
];

function PercentCharts({ type, data }) {
  return (
    <>
      <div style={{ textAlign: '-webkit-center' }}>
        {(type = 'accessibility') ? <Accessibility data={data} /> : <br />}
      </div>
    </>
  );
}

export default PercentCharts;
