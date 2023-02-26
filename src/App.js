import React from 'react';
import './assets/css/app.scss';
import github from './assets/images/app/techStack/akar-icons_github-fill.svg';
import bootstrap from './assets/images/app/techStack/logos_bootstrap.svg';
import git from './assets/images/app/techStack/logos_git-icon.svg';
import react from './assets/images/app/techStack/logos_react.svg';
import sass from './assets/images/app/techStack/logos_sass.svg';
import css from './assets/images/app/techStack/vscode-icons_file-type-css.svg';
import html from './assets/images/app/techStack/vscode-icons_file-type-html.svg';
import js from './assets/images/app/techStack/vscode-icons_file-type-js-official.svg';
import vsCode from './assets/images/app/techStack/vscode-icons_file-type-vscode.svg';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import ProjectsCard from './components/ProjectsCard.jsx';

export default function App() {
  return (
    <div className="page-data-wrap-seprator">
      <Header />
      <div className="page-content-wrap">
        <div className="block-1-wrap">
          <div className="block-1-header">
            <h1>
              Hi 👋,
              <br />
              My name is <br /> Vinay Choudhary <br />
              Reactjs Developer
            </h1>
          </div>
          <div className="block-1-content">
            <img src="https://cdn-icons-png.flaticon.com/512/6840/6840478.png" alt="" />
          </div>
        </div>

        <div className="block-2-wrap" id="techStack">
          <div className="block-2-header">
            <h1>My Tech Stack</h1>
            <p>Technologies I&apos;ve been working with recently</p>
          </div>
          <div className="block-2-content">
            <img src={github} alt="" />
            <img src={bootstrap} alt="" />
            <img src={git} alt="" />
            <img src={react} alt="" />
            <img src={sass} alt="" />
            <img src={html} alt="" />
            <img src={css} alt="" />
            <img src={js} alt="" />
            <img src={vsCode} alt="" />
          </div>
        </div>

        <div className="block-3-wrap block-2-wrap" id="projects">
          <div className="block-3-header block-2-header">
            <h1>Projects</h1>
            <p>Things I&apos;ve built so far</p>
          </div>
          <div className="block-3-content">
            <ProjectsCard
              image={'https://apptraitsolutions.com/wp-content/uploads/2021/01/C88IZyEo7g-1.jpg'}
              heading={'Quiz App'}
              description={
                'It is a quiz application in which you can signUp and attempt any quiz and can check your score.'
              }
              previewLink={'/login/quiz'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={
                'https://www.shutterstock.com/image-photo/admin-text-word-written-neon-260nw-1906709194.jpg'
              }
              heading={'Admin Panel'}
              description={
                'In this you can login using admin credentials and can edit, delete , create a user'
              }
              previewLink={'/login'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={
                'https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/0x0.jpg?format=jpg&width=360'
              }
              heading={'To-do Lists App'}
              description={
                'It is a advance To-do web application in which you can edit, delete and strike your tasks.'
              }
              previewLink={'/login/todoLists'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={'https://miro.medium.com/max/1400/1*fm6XPKNS9l9ZAyWZqsqyVA.png'}
              heading={'Login/Register Page'}
              description={'In this you can register and login to view dashboard'}
              previewLink={'/login'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={
                'https://images.unsplash.com/photo-1530563885674-66db50a1af19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhdGhlciUyMGFwcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
              }
              heading={'Weather App'}
              description={
                'It is an application in which you can search the temperature of any city.'
              }
              previewLink={'/weatherApp'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNoDI4n6eBEwev1exL4_Rg06YKmtC_p1f8A&usqp=CAU'
              }
              heading={'Fetch Data Assignment'}
              description={'In this the data is fetched from different APIs on request.'}
              previewLink={'https://fir-project1-bc3fc.web.app/pages/apiFetchTask.html'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={
                'https://cdn.dribbble.com/users/1615584/screenshots/17578107/media/55cd7c269f8c140c2f19281e30e8abb3.jpg?compress=1&resize=400x300'
              }
              heading={'Components Design'}
              description={
                'It is a advance To-do web application in which you can edit, delete and strike your tasks.'
              }
              previewLink={'https://fir-project1-bc3fc.web.app/pages/components.html'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={
                'https://1.bp.blogspot.com/-pdqcVeIQp64/XDX7TzdRdcI/AAAAAAAAM8E/ZmGuB6caZqIGmEflGHcj3zgXJJrmqRLdgCLcBGAs/w1200-h630-p-k-no-nu/Free%2BCourses%2Bto%2Blearn%2BJavaScript.jpg'
              }
              heading={'JS Practice'}
              description={'It is the template of the methods used while learning javascript.'}
              previewLink={'https://fir-project1-bc3fc.web.app/pages/jsPractice.html'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />

            <ProjectsCard
              image={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5esvtT-D1LVQLGkL_laiVZHe3hnio7zhvBw&usqp=CAU'
              }
              heading={'CSS Practice'}
              description={'It is the template of the methods used while learning CSS.'}
              previewLink={'https://fir-project1-bc3fc.web.app/pages/cssPractice.html'}
              codeLink={'https://bitbucket.org/_vinaychoudhary/reactjspractice/src/main/'}
            />
          </div>
        </div>
      </div>
      <div className="page-footer-wrap">
        <Footer />
      </div>
    </div>
  );
}
