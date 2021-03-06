import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './css/itemCss.css';
import { Link } from 'react-router-dom';
import store from './store/store';
import axios from 'axios';

class BoardList extends Component {
  constructor(props) {
    super(props);

    this.state = { mode: true, board_Data: [], board_Title: "", board_Desc: "" }
  }

  /*React Life Cycle의 한부분으로
      렌더링이 되기전에 호출되는 메소드.
      렌더를 하기전에 this.firebaseSetting을 호출함.*/
  componentDidMount() {
    this.databaseSetting();
    store.subscribe(function () {
      this.setState({ mode: store.getState().mode });
    }.bind(this));
  }

  /*React Life Cycle의 한부분으로
    렌더링이 다 되었을때 실행되는 메소드.
    이전의 props값과 현재의 props값을 비교하여
    다르다면 this.databaseSetting을호출함.*/
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.Search_Text !== prevProps.match.params.Search_Text) {
      this.databaseSetting();
    }
  }

  /*RestAPI를 이용하여 데이터베이스의 값을 불러와서
    this.state.board_Data에 넣어주고있음. */
  databaseSetting = () => {
    axios.get('https://j-s-board-express-backend.herokuapp.com/Board_Search?Search_Type=' + this.props.match.params.Search_Type + '&Search_Text=' + this.props.match.params.Search_Text)
      .then((Response) => {

        this.setState({
          board_Data: Response.data,
        });
      });
  }

  render() {
    return (
      <div className={"boardMain"}>
        <div className={"boardMainWraper"}>
          <div className={"boardList"}>
            <div className={"boardList_Top"}>
              <div className={"boardList_Top_Left"}>
                <h4 style={{ marginBottom: "0px", height: "85%", position: "absolute", bottom: 0 }}>찾는글이 있을땐?</h4>
                <h2 style={{ fontSize: "300%", marginBottom: "0px", height: "70%", position: "absolute", bottom: 0 }}>검색결과</h2>
              </div>
              <div className={"boardList_Top_Right"}>
                <Link to="/Write">
                  <button className={"material_Button"} style={{ marginBottom: "0px", position: "absolute", bottom: 13, width: "100%" }}>
                    <h2>글쓰기</h2>
                  </button>
                </Link>
              </div>
            </div>
            <div className={"boardList_Bottom"}>
              <DataGrid
                getRowId={(row) => row.Board_No}
                columns={[
                  { field: 'Board_No', headerName: "글 번호", flex: 0.2, headerAlign: "center", align: "center" },
                  {
                    field: 'Board_Title', headerName: "글 제목", flex: 1,
                    renderCell: (params) => (
                      <div style={{ height: "100%", width: "100%", textAlign: "left" }}>
                        <Link to={"/Read/" + params.row.Board_Code} style={{ height: "100%", width: "100%", textDecoration: "none" }} onClick={() => {
                        }}>{params.value}</Link>
                      </div>
                    )
                  },
                  { field: 'User_Name', headerName: "작성자", flex: 0.2, headerAlign: "center", align: "center" },
                  { field: 'Read_Count', headerName: "조회수", flex: 0.2, headerAlign: "center", align: "center" },
                ]}
                rows={this.state.board_Data}
                disableColumnMenu
                hideFooter
                sortModel={[
                  {
                    field: 'Board_No',
                    sort: 'desc',
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardList;