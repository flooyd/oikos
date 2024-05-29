export function load({params}) {
  return {
    title: `Post ${params.slug}`,
    comments: [
      {id: 1, author: 'rahl', content: 'Comment 1'},
      {id: 2, author: 'ralwus', content: 'Comment 2'},
      {id: 3, author: 'nated (rip)______________________', content: 'Comment 3'}
    ]
  }
}

const fetchPost = async() => {
  
}