<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Socialite;

class OAuthController extends Controller
{
    /**
     * 各SNSのOAuth認証画面にリダイレクトして認証
     * @param string $provider サービス名
     * @return mixed
     */
    public function socialOAuth(string $provider)
    {
        // google認証ページにリダイレクト
        return Socialite::driver($provider)->redirect();
    }

    /**
     * 各サイトからのコールバック
     * @param string $provider サービス名
     * @return mixed
     */
    public function handleProviderCallback($provider)
    {
        // socialUserにGoogleから渡されたユーザー情報が入っている
        $socialUser = Socialite::driver($provider)->stateless()->user();
        // 実行時に、指定したパラメータを持ったレコードが無ければ、新しくインスタンスを作成します。
        $user = User::firstOrNew(['email' => $socialUser->getEmail()]);

        // すでに会員になっている場合の処理を書く
        // そのままログインさせてもいいかもしれない
        if ($user->exists) {
            Auth::login($user);
            return redirect('/');
        }

        $user->name = $socialUser->getNickname();
        $user->provider_id = $socialUser->getId();
        $user->provider_name = $provider;
        $user->save();

        Auth::login($user);

        return redirect('/');
    }

}
