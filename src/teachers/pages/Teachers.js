import TeachersList from '../components/TeachersList';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';

const DUMMY = [
  {
    id: 't1',
    name: 'Miss Cheng',
    image:
      'https://ichef.bbci.co.uk/news/976/cpsprodpb/182FA/production/_110866099_gettyimages-905799292.jpg',
    title:
      '全職演奏級鋼琴女導師 ~ 學生考試成績100%合格 ，可於九龍灣導師家中上課或上門教授 ，歡迎各級有意學琴學生査詢 (9213-7747)！',
    description:
      '女私人鋼琴老師，因應學生性格及能力制定教學方法及挑選教材; 與家長及學生共同制定教學目標。九龍灣 三角琴授課，17年教學經驗，曾於柏斯琴行及其他音樂中心任教多年，獲頒「傑出鋼琴教師」及「優秀指導老師」。',
    contact: '91421304',
  },
  {
    id: 't2',
    name: 'Miss Cheng',
    image:
      'https://ichef.bbci.co.uk/news/976/cpsprodpb/182FA/production/_110866099_gettyimages-905799292.jpg',
    title:
      '全職演奏級鋼琴女導師 ~ 學生考試成績100%合格 ，可於九龍灣導師家中上課或上門教授 ，歡迎各級有意學琴學生査詢 (9213-7747)！',
    description:
      '女私人鋼琴老師，因應學生性格及能力制定教學方法及挑選教材; 與家長及學生共同制定教學目標。九龍灣 三角琴授課，17年教學經驗，曾於柏斯琴行及其他音樂中心任教多年，獲頒「傑出鋼琴教師」及「優秀指導老師」。',
    contact: '91421304',
  },
];

const Teachers = () => {
  const navigate = useNavigate();

  return (
    <section className="grid gap-3">
      <Button
        btnType="grey"
        className="inline-block place-self-end"
        onClick={() => navigate('/auth')}
      >
        請登入/註冊以刊登
      </Button>
      <TeachersList items={DUMMY} />
    </section>
  );
};

export default Teachers;
