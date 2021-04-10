import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './css/itemCss.css';
import { Link } from 'react-router-dom';
import store from './store/store';
import { CreateOutlined } from '@material-ui/icons';
import axios from 'axios';

class BoardList extends Component {
  constructor(props) {
    super(props);

    this.state = { mode: true, board_Data: [], board_Title: "", board_Desc: "" }
  }

  /*React Life Cycle의 한부분으로
      렌더링이 되기전에 호출되는 메소드.
      렌더를 하기전에 this.dataBaseSetting 호출함.*/
  componentDidMount() {
    this.dataBaseSetting();
    store.subscribe(function () {
      this.setState({ board_Data: store.getState().board_Data });
    }.bind(this));
  }

  /*React Life Cycle의 한부분으로
    렌더링이 다 되었을때 실행되는 메소드.
    이전의 props값과 현재의 props값을 비교하여
    다르다면 this.dataBaseSetting 호출함.*/
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.Board_Theme !== prevProps.match.params.Board_Theme) {
      this.dataBaseSetting();
    }
  }

  /*RestAPI를 이용하여 데이터베이스의 값을 불러와서
    this.state.board_Data에 넣어주고있음. */
  dataBaseSetting = () => {
    const board_Theme = this.props.match.params.Board_Theme;

    // 게시판의 테마를 정하여 값을 불러오는 함수.(게시판 종류에 따라)
    axios.get('https://j-s-board-express-backend.herokuapp.com/BoardList?Board_Theme='+board_Theme)
    .then((Response) => {      
      store.dispatch({type:"boardList", board_Data:Response.data});

      // 게시판의 테마에따라 보여지는 값이 달라지게 하기위함.
      switch (board_Theme) {
        case "FTB": this.setState({ board_Title: "자유게시판", board_Desc: "시간날때마다 보는?" });
          break;
        case "HTB": this.setState({ board_Title: "유머게시판", board_Desc: "재밌는걸 보고싶을땐?" });
          break;
        case "QTB": this.setState({ board_Title: "질문게시판", board_Desc: "모르는게 있을땐?" });
          break;
        case "ATB": this.setState({ board_Title: "홍보게시판", board_Desc: "이것좀 봐주세요~!" });
          break;
      }
    });
  }


  render() {
    let writeButton;

    // 현재 로그인상태일시 글쓰기 버튼이 활성화되도록 함.
    if (window.localStorage.getItem("LoginData") !== null) {
      writeButton =
        <Link to="/Write">
          <button className={"material_Button"} style={{ marginBottom: "0px", position: "absolute", bottom: 13, width: "100%" }}>
            <h2><CreateOutlined style={{ verticalAlign: "bottom" }} /> 글쓰기</h2>
          </button>
        </Link>
    }

    return (
      <div className={"boardMain"}>
        <div className={"boardMainWraper"}>
          <div className={"boardList"}>
            <div className={"boardList_Top"}>
              <div className={"boardList_Top_Left"}>
                <h4 style={{ marginBottom: "0px", height: "85%", position: "absolute", bottom: 0 }}>{this.state.board_Desc}</h4>
                <h2 style={{ fontSize: "300%", marginBottom: "0px", height: "70%", position: "absolute", bottom: 0 }}>{this.state.board_Title}</h2>
              </div>
              <div className={"boardList_Top_Right"}>
                {writeButton}
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
                        <Link to={"/Read/" + params.row.Board_No} style={{ height: "100%", width: "100%", textDecoration: "none" }} onClick={() => {
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