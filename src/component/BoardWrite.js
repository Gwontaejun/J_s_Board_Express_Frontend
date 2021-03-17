import React, { Component } from 'react';
import firestore from './store/fireStore';
import './css/itemCss.css';
import { Checkbox, Chip, FormControl, FormControlLabel, Select } from '@material-ui/core';
import { AddPhotoAlternateOutlined, CreateOutlined } from '@material-ui/icons';
import axios from 'axios';

class BoardWrite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board_Title: "",
            board_Theme: "",
            userNameInvisible: false,
            board_Content: "",
            imageFile: "",
            Count: [],
            board_No: 0,
        }

        this.board_Title = null;
    }


    componentWillMount() {
        axios.get('https://j-s-board-express-backend.herokuapp.com/BoardNoGet')
            .then((Response) => {
                this.setState({
                    board_No: Response.data.Board_No,
                });
            });
    }

    // 이미지 첨부 후 글 작성버튼을 눌렀을때 실행하는 함수.
    fileUpload = (Image_Name) => {
        const storageRef = firestore.firestore.storage().ref();
        const Board_Theme = this.state.board_Theme;

        var metadata = {
            contentType: 'image/*'
        };

        var uploadTask = storageRef.child('images/' + Image_Name)
            .put(this.state.imageFile, metadata);

        // 이미지 업로드 작업.
        uploadTask.on(firestore.firestore.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                // 이미지 업로드가 완료가 되면 게시판 글 목록으로 이동하도록 함.
                if (progress === 100) {
                    window.location.href = '/Theme/' + Board_Theme;
                }
            });
    }

    // 글 작성버튼을 눌렀을때 실행하는 함수.
    databaseWriteData = () => {
        let Image_Name = "";
        const User_Id = JSON.parse(window.localStorage.getItem("LoginData")).uid;
        let User_Name;
        const Board_Theme = this.state.board_Theme;

        // 이름 비공개 버튼을 누르면 이름이 비공개값으로 들어가도록 하기 위함.
        if (this.state.userNameInvisible === false) {
            User_Name = JSON.parse(window.localStorage.getItem("LoginData")).displayName;
        } else User_Name = "비공개";

        // 이미지가 첨부되었는지 확인하기 위함.
        if (this.state.imageFile.name === undefined) {
            Image_Name = "";
        } else Image_Name = this.state.board_No + "-" + this.state.imageFile.name;


        // 글 작성을 하는 작업(RestAPI를 이용해 database에 값을 저장하는 작업)
        axios.post("https://j-s-board-express-backend.herokuapp.com/BoardInsert",
            {
                Board_No: parseInt(this.state.board_No) + 1,
                Board_Theme: Board_Theme,
                Board_Title: this.state.board_Title,
                Board_Content: this.state.board_Content,
                Board_WriteDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
                User_Id: User_Id,
                User_Name: User_Name,
                Image_Name: Image_Name,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(() => {
                if (Image_Name === "") {
                    window.location.href = '/Theme/' + this.state.board_Theme;
                }else this.fileUpload(Image_Name);
            })

    }

    boardWriteEvent = () => {
        // 글 제목, 게시판종류가 빈값인지 확인 후 빈값이 아니라면 글작성을 실행.
        if (this.state.board_Title.length !== 0) {
            if (this.state.board_Theme.length !== 0) {
                this.databaseWriteData();
            } else {
                alert("게시판종류를 선택해주세요.");
            }
        } else {
            alert("글 제목을 적어주세요.");
            this.board_Title.focus();
        }
    }


    // 전반적인 input의 데이터를 state에 넣어주는 함수.
    handleChange = (e) => {
        const stateName = e.target.name;

        this.setState({
            [stateName]: e.target.value
        });
    }

    // 이미지 첨부 시 state에 이미지 데이터를 넣어주기 위해 실행하는 함수.
    handleImageChange = (e) => {
        const file = Array.from(e.target.files);
        this.setState({ imageFile: file[0] });
    }

    // 이미지를 첨부 후 위에 뜨는 chip의 x버튼을 눌렀을때 사라지도록 하는 함수.
    handleDelete = () => {
        this.setState({ imageFile: "" });
    }

    // 작성자를 비공개로할지 결정하는 함수
    handleUserNameInvisible = (e) => {
        this.setState({ userNameInvisible: e.target.checked });
    }



    render() {
        let imageNameDisplay = "none";
        let imageName = undefined;

        // 이미지 첨부 버튼을 눌러 이미지를 첨부 후 위에 뜨는 chip의 보여지는 여부.
        if (this.state.imageFile === "" || this.state.imageFile === undefined) {
            imageNameDisplay = "none";
        } else {
            imageNameDisplay = "flex";
            imageName = this.state.imageFile.name;
        }

        return (
            <div className={"boardMain"}>
                <div className={"boardMainWraper"}>
                    <div className={"boardList"}>
                        <div className={"boardList_Top"}>
                            <div className={"boardList_Top_Left"}>
                                <div style={{ display: "block", height: "100%" }}>
                                    <div style={{ display: "flex", height: "50%" }}>
                                        <FormControl style={{ width: "30%" }} variant="outlined">
                                            <Select
                                                placeholder={"게시판 종류"}
                                                className={"theme_Select"}
                                                native
                                                onChange={this.handleChange}
                                                value={this.state.boardTheme}
                                                name="board_Theme"
                                            >
                                                <option >게시판 종류</option>
                                                <option style={{ color: "black" }} value={"FTB"}>자유게시판</option>
                                                <option style={{ color: "black" }} value={"HTB"}>유머게시판</option>
                                                <option style={{ color: "black" }} value={"QTB"}>질문게시판</option>
                                                <option style={{ color: "black" }} value={"ATB"}>홍보게시판</option>
                                            </Select>
                                        </FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="userNameInvisible"
                                                    color="secondary"
                                                    onChange={this.handleUserNameInvisible}
                                                />
                                            }
                                            label="이름 비공개"
                                        />
                                    </div>
                                    <div style={{ display: "block", height: "43%", width: "100%" }}>
                                        <input variant="outlined" label="글 제목" name="board_Title" onChange={this.handleChange}
                                            className={"title_Input"} ref={(ref) => { this.board_Title = ref; }} placeholder={"글제목"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"boardList_Top_Right"}>
                                <button className={"material_Button"} startIcon={""} color={"primary"} variant={"contained"} onClick={this.boardWriteEvent}
                                    style={{ marginBottom: "0px", width: "100%", position: "absolute", bottom: 13 }}>
                                    <h2><CreateOutlined style={{ verticalAlign: "bottom" }} /> 글작성</h2>
                                </button>
                            </div>
                        </div>
                        <div className={"boardList_Bottom"}>
                            <textarea
                                name="board_Content" className={"content_Textarea"}
                                onChange={this.handleChange}
                            />
                            <div style={{ position: "absolute", bottom: "5%", right: "10%" }}>
                                <Chip style={{ position: "absolute", bottom: "100%", right: "0%", display: imageNameDisplay }} variant="outlined" color="secondary" label={imageName} onDelete={this.handleDelete} />
                                <button className={"material_Button"} color={"primary"} variant={"contained"} onClick={() => this.refs.inputFile.click()}
                                    onChange={this.handleImageChange} component="label" name="imageFile">
                                    <input hidden type="file" accept="image/*" ref="inputFile" />
                                    <h4><AddPhotoAlternateOutlined style={{ verticalAlign: "bottom" }} /> 이미지 첨부</h4>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardWrite;