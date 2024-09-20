import { Switch, Input, message } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store"
import { InputStatuses } from "@/types"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { genRandomUserId, REGEX_SPECIAL_CHAR, GITHUB_URL, parseQuery } from "@/common"
import { setOptions, setUserInfo, setQueryData } from "@/store/reducers/global"
import { version } from "../../../package.json"
import { useNavigate, useLocation } from "react-router-dom"

import styles from "./index.module.scss"
import logoSrc from "@/assets/login_logo.png"
import githubSrc from "@/assets/github.jpg"

const LoginPage = () => {
  const nav = useNavigate()
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const options = useSelector((state: RootState) => state.global.options)
  const [channel, setChannel] = useState("")
  const [userName, setUserName] = useState("")
  const [channelInputStatuses, setChannelInputStatuses] = useState<InputStatuses>("")

  const onChangeChannel = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (REGEX_SPECIAL_CHAR.test(value)) {
      setChannelInputStatuses("error")
      value = value.replace(REGEX_SPECIAL_CHAR, "")
    } else {
      setChannelInputStatuses("")
    }
    setChannel(value)
  }

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (REGEX_SPECIAL_CHAR.test(value)) {
      value = value.replace(REGEX_SPECIAL_CHAR, "")
    }
    setUserName(value)
  }

  const onLanguageChange = useCallback(
    (checked: boolean) => {
      const language = checked ? "zh" : "en"
      dispatch(setOptions({ language }))
      i18n.changeLanguage(language)
    },
    [i18n],
  )

  const onClickJoin = () => {
    if (!channel) {
      return messageApi.error("please enter channel name!")
    }
    if (!userName) {
      return messageApi.error("please enter user name!")
    }
    dispatch(setOptions({ channel }))
    dispatch(
      setUserInfo({
        userName,
        userId: genRandomUserId(),
      }),
    )
    const queryData = parseQuery(window.location.href)
    dispatch(setQueryData(queryData))
    nav(`/home`)
  }

  const onClickGithub = () => {
    window.open(GITHUB_URL, "_blank")
  }

  return (
    <div className={styles.loginPage}>
      {contextHolder}
      <section className={styles.content}>
        <section className={styles.top}>
          <span className={styles.github} onClick={onClickGithub}>
            <img src={githubSrc} alt="" />
            <span className={styles.text}>{t("login.github")}</span>
          </span>
          <span className={styles.language}>
            <Switch
              size="default"
              checkedChildren="中文"
              unCheckedChildren="English"
              value={options.language === "zh"}
              onChange={onLanguageChange}
            />
          </span>
        </section>
        <div className={styles.title}>
          <div className={styles.logo}>
            <img src={logoSrc} alt="transcription" />
          </div>
          <div className={styles.text}>늘봄에 오신 것을 환영해요 :)</div>
        </div>
        <div className={styles.item}>
          <Input
            status={channelInputStatuses}
            allowClear
            placeholder="채널 이름을 입력해 주세요."
            onChange={onChangeChannel}
            value={channel}
          />
        </div>
        <div className={styles.item}>
          <Input
            allowClear
            placeholder="이름을 입력해 주세요."
            onChange={onChangeUserName}
            value={userName}
          />
        </div>
        <div className={styles.btn} onClick={onClickJoin}>
          대화 시작하기
        </div>
        <div className={styles.version}>Version {version}</div>
      </section>
    </div>
  )
}

export default LoginPage