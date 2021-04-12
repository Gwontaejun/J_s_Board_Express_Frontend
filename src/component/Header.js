import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import store from '../component/store/store';
import LoginoutButton from './Items/LoginoutButton';
import SearchBar from './Items/SearchBar';
import { Brightness4Outlined } from '@material-ui/icons';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Text: "다크 모드로",
    }
  }

  componentDidMount() {
    store.subscribe(function () {
      this.setState({ Text: store.getState().Text });
    }.bind(this));
  }

  render() {

    return (
      <div className={"header"}>
        <div className={this.props.header_Background}>
          <AppBar position="static">
            <Toolbar className={this.props.header_Background}>
              <div className={"header_Left"}>
                <Typography variant="h3">
                  <Link to="/" style={{ color: "white", marginLeft: "15%" }}>
                    J's Board
                  </Link>
                </Typography>
              </div>
              <div className={"header_Center"}>
                <SearchBar />
              </div>
              <div className={"header_Right"}>
                <LoginoutButton ButtonType={this.props.ButtonType} ButtonColor={"secondary"} /> {/*로그인 및 로그아웃 버튼*/}
                <div style={{ display: "flex", alignItems: "center", width: "25%" }}>
                  <Button style={{ width: "100%" }} variant={this.props.ButtonType} color={this.props.ButtonColor} onClick={function () {
                    store.dispatch({ type: 'ModeConverter' });
                  }}>
                    <Brightness4Outlined style={{ marginRight: "3%" }} />{this.props.ButtonText}
                  </Button> {/*다크모드 및 라이트모드 버튼*/}
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default Header;