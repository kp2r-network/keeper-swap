import { ChainId } from '@uniswap/sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'

import Logo from '../../assets/svg/wordmark.svg'
import LogoDark from '../../assets/svg/wordmark_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { ExternalLink } from '../../theme'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`
const HeaderMob = styled.div`
  display: contents;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    justify-content: center;
    width: 100%;
`};
`
const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`
const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 2px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1.2rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  &.${activeClassName} {
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
    border-bottom: 3px solid #FF2D82;
  }
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    border-bottom: 3px solid #394053;
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 0 4px;
`}
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1.2rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  &.${activeClassName} {
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
    border-bottom: 3px solid #FF2D82;
  }
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    border-bottom: 3px solid #394053;
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 0 4px;
`}
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    align-items: flex-end;
    padding-bottom: 20px;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: flex;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
      <HeaderMob>
        <HeaderElement>
          <Title href=".">
            <UniIcon>
              <img src={isDark ? LogoDark : Logo} alt="logo" height="32px" />
            </UniIcon>
            </Title>
        </HeaderElement>
        <HeaderNav>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
           Swap
         </StyledNavLink>
         <StyledNavLink
           id={`pool-nav-link`}
           to={'/pool'}
           isActive={(match, { pathname }) =>
             Boolean(match) ||
             pathname.startsWith('/add') ||
             pathname.startsWith('/remove') ||
             pathname.startsWith('/create') ||
             pathname.startsWith('/find')
           }
         >
           Pool
         </StyledNavLink>
         <StyledExternalLink id={`stake-nav-link`} href={'https://kp2r.network/keep2r'}>
           Keep2r
         </StyledExternalLink>
         <StyledExternalLink id={`stake-nav-link`} href={'https://snapshot.page/#/keep2r.eth'}>
           Vote
         </StyledExternalLink>
         <StyledExternalLink id={`stake-nav-link`} href={'https://feed.kp2r.network/'}>
           Feed
         </StyledExternalLink>
         <StyledExternalLink id={`stake-nav-link`} href={'https://info.uniswap.org/pair/0xbf89051f8d04ad770e2231e9335d3b7483a0a51f'}>
           Charts
         </StyledExternalLink>
        </HeaderNav>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} ETH
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
        </HeaderMob>
      </RowBetween>
    </HeaderFrame>
  )
}
