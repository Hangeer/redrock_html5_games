<?php
/**
 * Created by PhpStorm.
 * 让别人看排名的
 * @Author Lich
 *  2014-11-26 19:39:16
 */

class RankController extends BaseController {

    public function index()
    {
        //表名
        $game = array(
                        '0' => '2048',
                        '1' => 'sun',
                        '2' => 'run',
                    );
        //游戏名
        $gamename = array(
                          '拼拼价值观',
                          '夸父追日',
                          '奔跑吧兄弟',
                        );

        foreach($game as $v)
        {
                  if($v == 'sun')
                  {
                      $info[] = DB::table($v)
                          ->select('telphone','score','time')
                          ->orderBy('score','asc')
                          ->orderBy('time','asc')
                          ->groupBy('telphone')
                          ->take(20)
                          ->get();
                  }
                  else{
                      $info[] = DB::table($v)
                          ->select('telphone','score','time')
                          ->orderBy('score','desc')
                          ->groupBy('telphone')
                          ->take(20)
                          ->get();
                  }

        }

        foreach($game as $v)
        {
            $num[] = DB::select("select COUNT(DISTINCT telphone) as num from `$v` ");


        }

        foreach($info as $k => $v)
        {
            foreach($v as $key => $value)
            {
                $data[$k][$key]= array($value->telphone, $value->score, $value->time,);
            }
            $data[$k]['title'] = $gamename[$k];
            $data[$k]['num'] = $num[$k][0]->num;
        }


        return View::make('rank.index')->with('data',$data);

    }

}

