import React, { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function QuizLevel() {
  const userInfoData = useSelector((state) => state.authentication.userInfo);
  const usersQuizScoreData = useSelector((state) => state.quiz.usersQuizScore);
  const quizdata = useSelector((state) => state.quiz.quizData);

  const [selectedLevel, setSelectedLevel] = useState('');
  const [levelError, setLevelError] = useState('');
  const [quizScore, setQuizScore] = useState();
  const [selectedCategorylevels, setSelectedCategorylevels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let userIdData = usersQuizScoreData.find((obj) => obj.id == userInfoData.id);
    if (userIdData) {
      setQuizScore(userIdData.quizScoreData.find((obj) => obj.catId == params.id));
    }
    setSelectedCategorylevels(
      quizdata.categories.find((obj) => obj.catId == params.id).levelContain,
    );
  }, [quizdata, usersQuizScoreData]);

  useEffect(() => {
    let newDataArr = [];
    selectedCategorylevels.forEach((val) => {
      quizdata.levels.forEach((obj) => {
        if (val == obj.levelId) {
          let newlevelObj = {
            levelId: obj.levelId,
            levelValue: obj.levelValue,
            levelScore: 0,
          };
          if (quizScore) {
            quizScore.levelScoreData.forEach((levelsObj) => {
              if (levelsObj.levelId == obj.levelId) {
                newlevelObj.levelScore = levelsObj.Score;
              }
            });
          }
          newDataArr.push(newlevelObj);
        }
      });
    });
    setChartData(newDataArr);
  }, [selectedCategorylevels, quizdata]);

  useEffect(() => {
    setLevelError('');
  }, [selectedLevel]);

  function nextPage() {
    if (selectedLevel == '') {
      setLevelError('Please select any level to continue');
    } else {
      navigate(`/quizHome/${params.id}/${selectedLevel.levelId}`);
    }
  }
  function handleCategory(obj) {
    if (quizScore && obj.levelId != 0) {
      let previosLevelScore = quizScore.levelScoreData.find(
        (item2) => item2.levelId == obj.levelId - 1,
      )?.Score;
      if (!previosLevelScore || previosLevelScore < 40) {
        setLevelError('Sorry, Your previous level score is below 40%');
      } else {
        setSelectedLevel(obj);
      }
    } else {
      if (obj.levelId != 0) {
        setLevelError('Sorry, Your previous level score is below 40%');
      } else {
        setSelectedLevel(obj);
      }
    }
  }

  return (
    <div className="quizPageWrapper">
      <div className="quizCategory">
        <h3 className="quizCategoryHeading">Select Level</h3>
        <nav aria-label="secondary mailbox folders">
          <List>
            {chartData.map((obj, key) => {
              return (
                <ListItem
                  disablePadding
                  key={key}
                  onClick={() => handleCategory(obj)}
                  className={obj.levelId == selectedLevel.levelId ? 'activeCategory' : ''}
                >
                  <ListItemButton>
                    <ListItemText
                      primary={obj.levelValue}
                      secondary={'Your Score ' + obj.levelScore + '%'}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </div>
      <p className="error">{levelError}</p>
      <button
        className="quizCategorybtn"
        onClick={() => {
          nextPage();
        }}
      >
        Next
      </button>
    </div>
  );
}
