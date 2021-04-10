import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store/store';

class CountList extends Component {
  constructor(props) {
    super(props);

    this.state = { board_Data: [] };
  }

  // 컴포넌트가 렌더되기 전에 실행하는 함수.
  componentDidMount() {
    this.databaseSetting();
    store.subscribe(function () {
      this.setState({ board_Data: store.getState().count_List });
    }.bind(this));
  }

  /*RestAPI를 이용하여 데이터베이스의 값을 불러와서
    this.state.board_Data에 넣어주고있음. */
  databaseSetting = () => {
    let orderType;
    if (this.props.hiddenType !== undefined) {
      orderType = this.props.hiddenType;
    } else {
      orderType = this.props.orderType;
    }

    axios.get('https://j-s-board-express-backend.herokuapp.com/CountList?Order_Type=' + orderType)
      .then((Response) => {
        // this.setState({ board_Data: Response.data });
        store.dispatch({type:"countList", count_List:Response.data});
      });
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div style={{ width: "100%", height: "15%", textAlign: "center", marginTop: "2%" }}>
          <h1 style={{ margin: "0px" }}>{this.props.TypeText}</h1>
        </div>
        <div style={{ display: "flex", width: "100%", height: "85%" }}>
          <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
            <DataGrid
              getRowId={(row) => row.Board_No}
              columns={[
                {
                  field: 'rowIndex', headerName: "순번", flex: 0.2, headerAlign: "center", align: "center", sortable: false,
                  renderCell: (params) => (
                    <div style={{width:"100%"}}>
                      <p>{params.rowIndex + 1}</p>
                    </div>
                  )
                },
                {
                  field: 'Board_Title', headerName: "글 제목", flex: 0.8, sortable: false,
                  renderCell: (params) => (
                    <div style={{ height: "100%", width: "100%", textAlign: "left" }}>
                      <Link to={"/Read/" + params.row.Board_No} style={{ height: "100%", width: "100%", textDecoration: "none" }} onClick={() => { }}>{params.value}</Link>
                    </div>
                  )
                },
              ]}
              rows={this.state.board_Data}
              disableColumnMenu
              hideFooter
              autoHeight
              showColumnRightBorder={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CountList;