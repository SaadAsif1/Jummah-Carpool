import React from 'react';
import HomeNavbar from '../../layouts/Home-Navbar/Navbar';
import Saad from '../../../assets/Saad.png';
import Umer from '../../../assets/Umer.jpg';
import Abdullah from '../../../assets/Abdalla.jpg';
import Mubariz from '../../../assets/Mubariz.jpg';
import './Team.css';

const Team = () => {
  return (
    <div className='home-container'>
      <HomeNavbar />

      <div className='team-container'>
        <div className='team-title-container'>
          <h2 className='team-title'>Meet The Team</h2>
        </div>

        <div className='team-card'>
          <img src={Saad} alt='Saad' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Full Stack Developer</div>
            <div className='team-name'>Saad Asif</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/saad-asif-7268851a8/'
              className='team-links'
            >
              linkedin.com/in/saad-asif
            </a>
            <div className='team-dec'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos explicabo
              quis voluptates inventore, officia veritatis deleniti ab pariatur vero,
              itaque rem vel iste ipsum tenetur soluta similique cupiditate blanditiis
              totam praesentium numquam corrupti repellendus distinctio? Esse quasi
              placeat eligendi distinctio dicta totam saepe delectus sunt quisquam maxime
              at, perferendis debitis aperiam impedit, quas iusto veniam fuga molestiae
              atque ad earum illum repellat. Cum minima alias perferendis nihil totam
              blanditiis asperiores, reprehenderit magnam pariatur fugit laudantium
            </div>
          </div>
        </div>

        <div className='team-card '>
          <img src={Mubariz} alt='Mubariz' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Back End Developer</div>
            <div className='team-name'>Mubariz Afzal</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/mubarizafzal/'
              className='team-links'
            >
              linkedin.com/in/mubarizafzal
            </a>
            <div className='team-dec'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos explicabo
              quis voluptates inventore, officia veritatis deleniti ab pariatur vero,
              itaque rem vel iste ipsum tenetur soluta similique cupiditate blanditiis
              totam praesentium numquam corrupti repellendus distinctio? Esse quasi
              placeat eligendi distinctio dicta totam saepe delectus sunt quisquam maxime
              at, perferendis debitis aperiam impedit, quas iusto veniam fuga molestiae
              atque ad earum illum repellat. Cum minima alias perferendis nihil totam
              blanditiis asperiores, reprehenderit magnam pariatur fugit laudantium
            </div>
          </div>
        </div>

        <div className='team-card'>
          <img src={Umer} alt='Umer' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Front End Developer</div>
            <div className='team-name'>Umer Pittal</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/umer-pittal-a523a9149/'
              className='team-links'
            >
              linkedin.com/in/umer-pittal
            </a>
            <div className='team-dec'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos explicabo
              quis voluptates inventore, officia veritatis deleniti ab pariatur vero,
              itaque rem vel iste ipsum tenetur soluta similique cupiditate blanditiis
              totam praesentium numquam corrupti repellendus distinctio? Esse quasi
              placeat eligendi distinctio dicta totam saepe delectus sunt quisquam maxime
              at, perferendis debitis aperiam impedit, quas iusto veniam fuga molestiae
              atque ad earum illum repellat. Cum minima alias perferendis nihil totam
              blanditiis asperiores, reprehenderit magnam pariatur fugit laudantium
            </div>
          </div>
        </div>

        <div className='team-card'>
          <img src={Abdullah} alt='Abdullah' className='team-img' />
          <div className='team-dec-container'>
            <div className='team-role'>Front End Developer</div>
            <div className='team-name'>Abdullah Atalla</div>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='http://linkedin.com/in/abdalla-atalla-300616173'
              className='team-links'
            >
              linkedin.com/in/abdalla-atalla
            </a>
            <div className='team-dec'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos explicabo
              quis voluptates inventore, officia veritatis deleniti ab pariatur vero,
              itaque rem vel iste ipsum tenetur soluta similique cupiditate blanditiis
              totam praesentium numquam corrupti repellendus distinctio? Esse quasi
              placeat eligendi distinctio dicta totam saepe delectus sunt quisquam maxime
              at, perferendis debitis aperiam impedit, quas iusto veniam fuga molestiae
              atque ad earum illum repellat. Cum minima alias perferendis nihil totam
              blanditiis asperiores, reprehenderit magnam pariatur fugit laudantium
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
