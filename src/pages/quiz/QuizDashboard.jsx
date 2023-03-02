import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import '../../assets/css/quizDashboard.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function QuizDashboard() {
  const userInfoData = useSelector((state) => state.authentication.userInfo);
  const quizAppData = useSelector((state) => state.quiz.quizData);
  const usersQuizScoreData = useSelector((state) => state.quiz.usersQuizScore);

  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [chartLabelData, setChartLabelData] = useState([]);
  const [chartDatasetsData, setChartDatasetsData] = useState([]);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    let chartObj;
    scoreData.forEach((obj) => {
      if (obj.catId == selectedCategory) {
        chartObj = obj;
      }
    });
    let labelArray = [];
    let datasetData = [];
    if (chartObj) {
      chartObj.level.forEach((obj) => {
        labelArray.push(obj.levelName);
        datasetData.push(obj.levelScore);
      });
    }
    setChartLabelData(labelArray);
    setChartDatasetsData(datasetData);
  }, [selectedCategory]);

  let data = {
    labels: chartLabelData,
    datasets: [
      {
        label: 'Your Score',
        data: chartDatasetsData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgb(255, 205, 86)', 'rgb(153, 102, 255)'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    let data = [];

    quizAppData.categories.map((obj, index) => {
      let dataTemp = {
        sNo: '',
        catId: '',
        category: '',
        level: [],
      };
      dataTemp.sNo = index + 1;
      dataTemp.catId = obj.catId;
      dataTemp.category = obj.catVal;
      dataTemp.level = [];
      obj.levelContain.map((val) => {
        quizAppData.levels.map((objTemp) => {
          if (val == objTemp.levelId) {
            let levData = {
              levelName: objTemp.levelValue,
              levelId: objTemp.levelId,
              levelScore: 0,
            };
            dataTemp.level.push(levData);
          }
        });
      });
      data.push(dataTemp);
    });

    let loginUserQuizScoreDataArray = usersQuizScoreData.find(
      (obj) => obj.id == userInfoData.id,
    )?.quizScoreData;
    if (loginUserQuizScoreDataArray) {
      data.map((tempObj) => {
        loginUserQuizScoreDataArray.map((obj2) => {
          if (tempObj.catId == obj2.catId) {
            tempObj.level.map((obj4) => {
              obj2.levelScoreData.map((obj3) => {
                if (obj3.levelId == obj4.levelId) {
                  obj4.levelScore = obj3.Score;
                }
              });
            });
          }
        });
      });
    }
    setScoreData(data);
  }, []);

  function handleDashboardBtn() {
    navigate('/quizCategory');
  }

  return (
    <div className="quizDashboardPageWrapper">
      <div className="quizDashboardPageBtnWrap">
        <button className="quizDashboardBtn" onClick={() => handleDashboardBtn()}>
          Start Quiz
        </button>
      </div>
      <div className="quizProfileWrap">
        <h1 className="contentWrapHeader">Profile</h1>
        <div className="quizProfileWrapBox">
          <div className="quizWrapperContentNames">
            <p>Name</p>
            <p>Email</p>
            <p>Password</p>
            <p>Status</p>
            <p>Type</p>
          </div>
          <div className="quizWrapperContentValues">
            <p>{userInfoData.userName}</p>
            <p>{userInfoData.email}</p>
            <p>{userInfoData.password}</p>
            <p>{userInfoData.status}</p>
            <p>{userInfoData.type}</p>
          </div>
        </div>
      </div>
      <div className="quizDashboardScore">
        <h1 className="contentWrapHeader">Score Board</h1>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>SNo.</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Levels</TableCell>
                <TableCell>Your Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreData.map((obj, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{obj.sNo}</TableCell>
                  <TableCell>{obj.category}</TableCell>
                  <TableCell>
                    {obj.level.map((lvlObj, index) => {
                      return (
                        <div key={index} className="marginX">
                          {lvlObj.levelName}
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    {obj.level.map((lvlObj, index) => {
                      return (
                        <div key={index} className="marginX">
                          {lvlObj.levelScore}
                        </div>
                      );
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="quizChart">
        <h1 className="contentWrapHeader">Category Chart</h1>
        <div className="quizChartContentWrap">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Cateogry</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Select Category"
              onChange={handleChange}
            >
              {scoreData.map((obj, key) => {
                return (
                  <MenuItem value={obj.catId} key={key}>
                    {obj.category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="quizChartFooterWrap">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}
