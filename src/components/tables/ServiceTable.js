import React from 'react';

import {Td} from '@patternfly/react-table';

import { GithubIcon, GitlabIcon, CodeBranchIcon } from '@patternfly/react-icons';

import { NavLink } from 'react-router-dom';

import Moment from 'react-moment';

import GenericTable from './GenericTable';

function ServiceTable({dataPath = "/api/v1/services"}) {
    function FormatColumn(column) {
        if (column === "ID") {
            return null;
        } else if (column === "Name") {
            return null;
        } else if (column === "DisplayName") {
            return "Service";
        } else if (column === "GHRepo") {
            return "GitHub";
        } else if (column === "GLRepo") {
            return "GitLab";
        } else if (column === "Commits") {
            return "Latest Commits";
        } else if (column === "Deploys") {
            return "Latest Deploys";
        } else if (column === "DeployFile") {
            return "Deploy File";
        }
        return column;
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex, compoundExpandParams = null) {
        const column = columns[cellIndex];
    
        // do not display the id columns
        if (column === "ID" || column === "Name") {
            return null;
        } 

        let expandable = false;

        let cellContents;

        let width = 0; // percentage modifier for the cell width
        
        if (column === "DisplayName") {
            cellContents = <NavLink to={`/services/${row[1]}`}>{cell}</NavLink>;
        } else if (column === "GHRepo" && cell !== "") {
            width = 10;
            cellContents =  <a href={cell} target="_blank" rel="noreferrer">
                                <GithubIcon key="icon" />
                            </a>;
        } else if (column === "GLRepo" && cell !== "") {
            width = 10;
            cellContents = <a href={cell} target="_blank" rel="noreferrer">
                                <GitlabIcon key="icon" />
                            </a>;
        } else if (column === "MergedBy") {
            cellContents = <>Merged By</>;
        } else if (column === "Commits" && cell.length > 0) { 
            cellContents = <><CodeBranchIcon /><Moment date={cell[0].Timestamp} format=" MM/YYYY"/></>;
            expandable = true;
        } else if (column === "Deploys" && cell !== null && cell.length > 0) {
            cellContents = <><CodeBranchIcon /><Moment date={cell[0].Timestamp} format=" MM/YYYY"/></>;
            expandable = true;
        } else {
            cellContents = <>{cell}</>;
        }
        return <Td key={`${rowIndex}_${cellIndex}`} 
                    dataLabel={column}
                    compoundExpand={expandable && compoundExpandParams != null ? compoundExpandParams(rowIndex, cellIndex) : null}
                >
                    {cellContents}
                </Td>
    }

    return (
        <GenericTable 
            title = "Services"
            dataPath ={dataPath}
            cellFunction={FormatCell}
            columnFunction={FormatColumn} />
    );
}

export default ServiceTable;
