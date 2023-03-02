import React, { useEffect, useState } from 'react';
import '../../assets/css/quizCategory.scss';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function QuizCategory() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const navigate = useNavigate();
  const categoryList = useSelector((state) => state.quiz.quizData);

  useEffect(() => {
    setCategoryError('');
  }, [selectedCategory]);

  function nextPage() {
    if (selectedCategory == '') {
      setCategoryError('Please select any category to continue');
    } else {
      navigate(`/quizlevel/${selectedCategory.catId}`);
    }
  }
  function handleCategory(obj) {
    setSelectedCategory({
      catId: obj.catId,
      catVal: obj.catVal,
    });
  }

  return (
    <div className="quizPageWrapper">
      <div className="quizCategory">
        <h3 className="quizCategoryHeading">Select Category</h3>
        <nav aria-label="secondary mailbox folders">
          <List>
            {categoryList.categories.map((obj, key) => {
              return (
                <ListItem
                  disablePadding
                  key={key}
                  onClick={() => handleCategory(obj)}
                  className={obj.catId == selectedCategory.catId ? 'activeCategory' : ''}
                >
                  <ListItemButton>
                    <ListItemText primary={obj.catVal} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </div>
      <p className="error">{categoryError}</p>
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
