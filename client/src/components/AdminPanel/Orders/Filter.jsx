import React from 'react';
import ctgStyle from './Orders.module.css'; 

export default function Pagination({ filterFunction }) {
	return (
		<>
			<select onChange={filterFunction} className={ctgStyle.selectCss}>
				<option value="all" key="0" >
					Todos los Estados
				</option>
				<option value="created" key="1">
                    Creada
				</option>
				<option value="processing" key="2">
                    Procesando
				</option>
                <option value="cancelled" key="3">
                    Cancelada
				</option>
                <option value="completed" key="4">
                    Completada
				</option>
			</select>
		</>
	);
}
