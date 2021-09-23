import React from 'react';
import ctgStyle from './Orders.module.css'; 

export default function Pagination({ filterFunction }) {
	return (
		<>
			<select onChange={filterFunction} className={ctgStyle.selectCss}>
				<option value="all" key="0" >
					Ordenar por Estado
				</option>
				<option value="created" key="1">
                    Created
				</option>
				<option value="processing" key="2">
                    Processing
				</option>
                <option value="cancelled" key="3">
                    Cancelled
				</option>
                <option value="completed" key="4">
                    Completed
				</option>
			</select>
		</>
	);
}
