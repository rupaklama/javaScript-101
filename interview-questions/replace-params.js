// Write a function to replace parameters in url

const initialUrl = '/posts/:postId/comments/:commentId';

const resultUrl = replaceParamsInUrl(initialUrl, [
  { from: 'postId', to: '1' },
  { from: 'commentId', to: '3' },
]);

function replaceParamsInUrl(url, postArr) {
  return postArr.reduce((acc, current) => {
    return acc.replace(':' + current.from, current.to);
  }, url);
}

console.log(resultUrl); // /posts/1/comments/3
