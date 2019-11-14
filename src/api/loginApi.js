import request from '@/main'

//学生登录
export function login1(data){
	return request({
		url: '/user/login',
		method: 'post',
		data
	})
}

//学委登录
export function login2(data){
  return request({
    url: '/user/wlogin',
    method: 'post',
	  data
  })
}

//查询学委
export function xueId (data) {
  return request({
    url:'/student/xueId',
    method:'post',
    data
  })
}

//作业集合
export function workList (data) {
  return request({
    url:'/work/list',
    method:'post',
    data
  })
}

//添加作业
export function insertWork (data) {
  return request({
    url: '/work/insertWork',
    method: 'post',
    data
  })
}

//删除作业
export function deleteWork (data) {
    return request({
      url:'/work/deleteWork',
      method:'post',
      data
    })
}

//编辑作业
export function updateWork (data) {
    return request({
      url:'/work/updateWork',
      method:'post',
      data
    })
}

//查询学生集合
export function studentList (data) {
    return request({
      url:'/student/studentList',
      method:'post',
      data
    })
}

//查询作业
export function selectWork (data) {
  return request({
    url:'/student/selectWork',
    method:'post',
    data
  })
}

//学生注册
export function registerStudent (data) {
  return request({
    url:'/student/registerStudent',
    method:'post',
    data
  })
}

//学委注册
export function registerMStudent (data) {
  return request({
    url:'/student/registerMStudent',
    method:'post',
    data
  })
}

//根据学生学号找到学生对象
export function findStudent (data) {
  return request({
    url:'/student/findStudent',
    method:'post',
    data
  })
}

//根据学委学号找到对应的班级名
export function findCName (data) {
  return request({
    url:'/student/findCName',
    method:'post',
    data
  })
}

//根据学委的学号找到对应的作业名
export function queryWork (data) {
  return request({
    url:'/work/queryWork',
    method:'post',
    data
  })
}

//根据作业名找到对应的作业
export function selectWork1(data){
  return request({
    url:'/work/selectWork',
    method:'post',
    data
  })
}

//根据学生的姓名找到对应的学生
export function selectStudent(data){
  return request({
    url:'/student/selectStudent',
    method:'post',
    data
  })
}

//根据学委的ID找到对应的学生姓名
export function selectSName(data){
  return request({
    url:'/student/selectSName',
    method:'post',
    data
  })
}

//学生修改密码
export function updateSPWD(data){
  return request({
    url:'/student/updateSPWD',
    method:'post',
    data
  })
}

//学委修改密码
export function updatePWD (data) {
  return request({
    url:'/student/updatePWD',
    method:'post',
    data
  })
}

