import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Article from '../components/article'
import Nav from '../components/nav'
import WeatherNews from '../components/weather-news'
import PickupArticle from '../components/pickup-article'

export default function Home(props) {
  return (
    // importしたMainLayoutを表示（HeaderとMain）
    <MainLayout>
      {/* Head要素 */}
      <Head>
        <title>Simple News</title>
      </Head>
      {/* Main要素の中の大枠 */}
      <div className={styles.contents}>
        {/* NavComponent */}
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        {/* ArticleComponent */}
        <div className={styles.main}>
          <Article title="headline" articles={props.topArticles} />
        </div>
        {/* SidebarComponent */}
        <div className={styles.aside}>
          {/* 天気予報 */}
          <WeatherNews weatherNews={props.weatherNews} />
          {/* ピックアップ */}
          <PickupArticle articles={props.pickupArticles} />
        </div>
      </div>
    </MainLayout>
  );
}


// ”getStaticProps”でビルド時に外部からのデータなどを事前にフェッチする（async await を使った非同期処理）
export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10  //取得する記事の数
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=06561b6983a242148d53c6663d4c60b7`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  // OpenWeatherMapの天気の情報を取得
  const lat = 35.4122    // 取得したい地域の緯度と経度(今回は東京)
  const lon = 139.4130
  const exclude = "hourly,minutely"   // 取得しない情報(1時間ごとの天気情報と1分間ごとの天気情報)
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=d2b2d2f9af067ba2cc5e4a79730de5c7`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのピックアップ記事の情報を取得
  const keyword = "frontend"   // キーワードで検索(ソフトウェア)
  const sortBy = "popularity"  // 表示順位(人気順)
  const pickupPageSize = 5     // ページサイズ(5)
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=06561b6983a242148d53c6663d4c60b7`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  return {
    props: {
      topArticles,
      weatherNews,
      pickupArticles
    },
    revalidate: 60,
  };
};

