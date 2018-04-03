<?php
/**
 * Created by PhpStorm.
 * User: wangcailin
 * Date: 2018/4/2
 * Time: 下午5:08
 */

namespace app\admin\controller;

use app\common\controller\Backend;
use ZipArchive;
use think\Exception;
use think\Config;

class Importpagefile extends Backend
{
    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        return $this->view->fetch();
    }

    /**
     * 文件上传
     */
    public function importFile()
    {
        Config::set('default_return_type', 'json');

        $file = $this->request->file('file');
        $fileTmpDir = RUNTIME_PATH . 'uploadfile' . DS;
        if (!is_dir($fileTmpDir))
        {
            @mkdir($fileTmpDir, 0755, true);
        }
        $info = $file->rule('uniqid')->validate(['size' => 10240000, 'ext' => 'zip'])->move($fileTmpDir);
        if ($info)
        {
            $tmpName = substr($info->getFilename(), 0, stripos($info->getFilename(), '.'));
            $tmpFile = $fileTmpDir . $info->getSaveName();
            try
            {
                $unzipTmpDir = $this->unzip($tmpName);
                if (!is_dir($unzipTmpDir))
                {
                    throw new Exception(__('解压文件失败'));
                }
                $filesnames = scandir($unzipTmpDir);
                $filesnames = $this->checkDirFile($filesnames);
                $filesnames = $unzipTmpDir . $filesnames . DS;
                if (!is_dir($filesnames))
                {
                    throw new Exception(__('寻找文件失败'));
                }
                session('filedir', $filesnames);
                @unlink($tmpFile);
                $this->success(__('文件解析成功'));
            }
            catch (Exception $e)
            {
                @unlink($tmpFile);
                $this->error($e->getMessage());
            }
        }
        else
        {
            // 上传失败获取错误信息
            $this->error($file->getError());
        }
    }

    public function submit()
    {
        $fileDir = session('filedir');
        $formData = input('row/a');
        $jsDir = ROOT_PATH . 'public/assets/js/index/' . $formData['project'] . DS;
        $cssDir = ROOT_PATH . 'public/assets/css/index/' . $formData['project'] . DS;
        $imgDir = ROOT_PATH . 'public/assets/img/index/' . $formData['project'] . DS;
        $fontsDir = ROOT_PATH . 'public/assets/fonts/index/' . $formData['project'] . DS;
        $controllerFunction = [];
        $pageUrl = '';
        try{
            if($handle = opendir($fileDir)){
                while (false !== ($file = readdir($handle))){
                    $str = substr($file,0,1);
                    if ($str != '.' && $str != '_'){
                        if (strpos($file, '.html')){
                            $controllerFunction[] = str_replace('.html', '', $file);
                            $pageUrl .= $file . '页面链接：<br />' . $_SERVER['HTTP_HOST'] . '/index/' . $formData['project'] .'/'. $formData['module'] .'/'. $file . '<br />';
                        try
                        {
                            $filename   = $fileDir . $file;
                            $moduleDir  = APP_PATH . 'index/view/' . $formData['project'] . DS . $formData['module'] . DS;
                            $newFileDir = $moduleDir . $file;
                            if (!is_dir($moduleDir)){
                                $projectDir = APP_PATH . 'index/view/' . $formData['project'] . DS;
                                if (!is_dir($projectDir)){
                                    if (!mkdir($projectDir, 0755, true)){
                                        throw new Exception(__('创建项目文件夹失败'));
                                    }
                                }
                                if (!mkdir($moduleDir, 0755, true)){
                                    throw new Exception(__('创建模块文件夹失败'));
                                }
                            }
                            if (!copy($filename, $newFileDir)){
                                throw new Exception(__('添加.html文件失败'));
                            }
                        }
                        catch (Exception $e)
                        {
                            @unlink($projectDir);
                            $this->error($e->getMessage());
                        }
                    }elseif (is_dir($fileDir.$file)){
                            try
                            {
                                if($handleold = opendir($fileDir.$file)){
                                    while (false !== ($fileold = readdir($handleold))){
                                        $strold = substr($fileold,0,1);
                                        if ($strold != '.' && $strold != '_'){
                                            if ($file == $formData['js']){
                                                if (!is_dir($jsDir)) mkdir($jsDir, 0755, true);
                                                copy($fileDir.$formData['js'].DS.$fileold, $jsDir.$fileold);
                                            }elseif ($file == $formData['css']){
                                                if (!is_dir($cssDir)) mkdir($cssDir, 0755, true);
                                                copy($fileDir.$formData['css'].DS.$fileold, $cssDir.$fileold);
                                            }elseif ($file == $formData['img']){
                                                if (!is_dir($imgDir)) mkdir($imgDir, 0755, true);
                                                copy($fileDir.$formData['img'].DS.$fileold, $imgDir.$fileold);
                                            }elseif ($file == $formData['fonts']){
                                                if (!is_dir($fontsDir)) mkdir($fontsDir, 0755, true);
                                                copy($fileDir.$formData['fonts'].DS.$fileold, $fontsDir.$fileold);
                                            }
                                        }
                                    }
                                    closedir($handleold);
                                }
                            }
                            catch (Exception $e)
                            {
                                $this->error($e->getMessage());
                            }

                        }
                    }

                }
                closedir($handle);
            }
            $data = [
                'controllerNamespace'      => 'app\index\controller\\'.$formData['project'].';',
                'controllerName'            => $formData['module'],
                'projectName'               => $formData['project'],
                'controllerFunction'        => $controllerFunction,
            ];
            $controllerFile            = 'controller';
            $controllerFunctionFile    = 'controllerfunction';
            $this->writeToFile($data, $controllerFile, $controllerFunctionFile);
            $this->success('页面部署成功！', '', $pageUrl);
        }
        catch (Exception $e)
        {
            $this->error($e->getMessage());
        }

    }

    /**
     * 解压文件
     * @param $name     文件路径
     * @return string
     * @throws Exception
     */
    public static function unzip($name)
    {
        $file = RUNTIME_PATH . 'uploadfile' . DS . $name . '.zip';
        $dir = RUNTIME_PATH . 'uploadfile/' . $name . DS;
        if (class_exists('ZipArchive'))
        {
            $zip = new ZipArchive;
            if ($zip->open($file) !== TRUE)
            {
                throw new Exception('Unable to open the zip file');
            }
            if (!$zip->extractTo($dir))
            {
                $zip->close();
                throw new Exception('Unable to extract the file');
            }
            $zip->close();
            return $dir;
        }
        throw new Exception("无法执行解压操作，请确保ZipArchive安装正确");
    }

    /**
     * 排除文件
     * @param $filesnames
     * @return mixed
     */
    private function checkDirFile($filesnames)
    {
        if ($filesnames){
            foreach ($filesnames as $k=>$v){
                $str = substr($v,0,1);
                if ($str != '.' && $str != '_'){
                    return $v;
                }
            }
        }
    }

    /**
     * 写入到文件
     * @param $data
     * @param $controllerFile
     * @param $controllerFunctionFile
     * @return bool|int
     */
    protected function writeToFile($data, $controllerFile, $controllerFunctionFile)
    {
        $pathname = APP_PATH . 'index' . DS . 'controller' . DS . $data['projectName'] . DS . $data['controllerName'] . '.php';
        if (!is_dir(dirname($pathname))) {
            mkdir(strtolower(dirname($pathname)), 0755, true);
        }

        $function = '';
        foreach ($data['controllerFunction'] as $k=>$v){
            $datas['controllerFunction'] = $v;
            $function .= $this->getReplacedStub($controllerFunctionFile, $datas);
        }
        unset($data['controllerFunction']);
        $data['controllerFunction'] = $function;
        $content  = $this->getReplacedStub($controllerFile, $data);
        return file_put_contents($pathname, $content);
    }

    /**
     * 获取替换后的数据
     * @param string $name
     * @param array $data
     * @return string
     */
    private function getReplacedStub($name, $data)
    {
        $search = $replace = [];
        foreach ($data as $k => $v) {
            $search[] = "{%{$k}%}";
            $replace[] = $v;
        }
        $stubname = $this->getStub($name);
        $stub = file_get_contents($stubname);
        $content = str_replace($search, $replace, $stub);
        return $content;
    }

    /**
     * 获取stub文件内容
     * @param $name
     * @return string
     */
    protected function getStub($name)
    {
        return APP_PATH . 'index' . DS . 'controller' .  DS . 'stubs' . DS . $name . '.stub';
    }


}