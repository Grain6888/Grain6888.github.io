# Unity Editor における Unsupported User Elements の警告と表示方法

Unity Editor のメインツールバーに対し，非推奨の方法でカスタム要素を追加している場合，以下の警告メッセージが表示されることがある．

> 「We have detected that your project includes custom elements added to the Unity Editor's main toolbar using unsupported methods. This approach is not supported and will lead to issues in future versions. Refer to the official <a href="https://docs.unity3d.com/6000.3/Documentation/ScriptReference/Toolbars.MainToolbar.html">API documentation</a> for adding custom elements to the main toolbar.」

また，関連して次のようなログが出力される場合がある．

> 「Your custom toolbar elements can be unhidden via the context menu (right-click the main toolbar -> <i>Unsupported User Elements</i>).  
> UnityEngine.UIElements.VisualElement:Add (UnityEngine.UIElements.VisualElement)  
> Meta.XR.Editor.StatusMenu.StatusIcon:Enable () (at ./Library/PackageCache/com.meta.xr.sdk.core@a87f85fa91d3/Editor/Utils/StatusMenu/StatusIcon.cs:177)  
> Meta.XR.Editor.StatusMenu.StatusIcon:Update () (at ./Library/PackageCache/com.meta.xr.sdk.core@a87f85fa91d3/Editor/Utils/StatusMenu/StatusIcon.cs:145)  
> UnityEditor.EditorApplication:Internal_CallUpdateFunctions ()」

## カスタム要素の表示方法

上記の警告が表示された場合，メインツールバー上の空白領域を右クリックし，コンテキストメニューから **Unsupported User Elements** にチェックを入れることで，非推奨の方法で追加されたカスタム要素を表示できる．

この設定により，Unity Editor が非推奨扱いとして隠しているユーザー定義要素を再度可視化できる．
