import './Grid.css'

type Callback = () => any;

/**
 * A single cell in Conway's Game of Life. 
 * @param props.value determines whether or not the cell is alive or dead.
 * @param props.onClick
 * @return a styled Button
 */
function Cell(props: { isAlive: boolean, onClick: Callback }): JSX.Element {
  return (
    <button className={`${props.isAlive ? 'alive' : ''} life-cell`} onClick={props.onClick}></button>
  )
}

function Grid(props: { cells: boolean[][], clickHandler?: (x: number, y: number) => Callback }): JSX.Element {
  const cells = props.cells;

  let tableBody = [];

  for (let i = 0; i < cells.length; ++i) {
    const row = cells[i];

    tableBody.push(
      <tr className='life-grid-row' key={'row-' + i}>
        {
          row.map((cell, j) => <td key={`cell${i}.${j}`}>
            <Cell isAlive={cell} onClick={props.clickHandler!(i, j)} />
          </td>)
        }
      </tr>
    );
  }

  return (
    <table className='life-grid' >
      <tbody>
        {tableBody}
      </tbody>
    </table>
  )
}


export default Grid;