import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';

const DUMMY = {
  id: 't1',
  name: 'Miss Cheng',
  image:
    'https://ichef.bbci.co.uk/news/976/cpsprodpb/182FA/production/_110866099_gettyimages-905799292.jpg',
  title:
    '全職演奏級鋼琴女導師 ~ 學生考試成績100%合格 ，可於九龍灣導師家中上課或上門教授 ，歡迎各級有意學琴學生査詢 (9213-7747)！',
  district: '將軍澳, 荔枝角, 屯門',
  time: '星期一至五',
  description:
    '女私人鋼琴老師，因應學生性格及能力制定教學方法及挑選教材; 與家長及學生共同制定教學目標。九龍灣 三角琴授課，17年教學經驗，曾於柏斯琴行及其他音樂中心任教多年，獲頒「傑出鋼琴教師」及「優秀指導老師」。',
  contact: '91421304',
};

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { image, title, description, contact, district, time, name } = DUMMY;

  return (
    <>
      <section className="grid gap-5">
        <div>
          <img src={image} alt={name} />
        </div>
        <h2>{title}</h2>
        <div>
          <h3 className="mb-1 text-sky-900">詳細資料</h3>
          <p>{description}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sky-900">聯絡電話</h3>
          <p>{contact}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sky-900">時間</h3>
          <p>{time}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sky-900">地區</h3>
          <p>{district}</p>
        </div>
        <Button
          btnType="back"
          className="place-self-end"
          onClick={() => navigate('/')}
        >
          返回
        </Button>
      </section>
    </>
  );
};

export default TeacherDetail;
